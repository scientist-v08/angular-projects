import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import {
  InventoryItem,
  InventoryResponseInterface,
} from '../../../interfaces/inventory.interface';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../../../components/button.component';
import { PaginatorState } from 'primeng/paginator/paginator.interface';
import { PaginatorModule } from 'primeng/paginator';
import { AddItemComponent } from './addItem.component';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { CompleteComponent } from './complete.component';
import { InventoryState } from '../../../constants/inventory.constants';
import { SpinnerComponent } from '../../../components/spinner.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabel,
    ButtonComponent,
    PaginatorModule,
    AddItemComponent,
    Toast,
    CompleteComponent,
    SpinnerComponent,
  ],
  template: `
    <div
      class="flex items-center justify-center flex-col md:flex-row md:justify-between"
    >
      @if (showAddItem()) {
      <app-add-item (toaster)="messageService($event)" />
      }
      <h2
        class="text-3xl font-semibold text-indigo-900 dark:text-amber-300 mb-4"
      >
        Total cost of goods: ₹{{ total() }}
      </h2>
    </div>
    <div
      class="flex gap-2 flex-col items-center justify-center md:flex-row md:items-center md:justify-between mb-4"
    >
      <form
        [formGroup]="searchForm"
        class="flex gap-2 flex-col md:flex-row items-center justify-center"
      >
        <p-floatlabel class="md:mr-2" variant="on">
          <input
            [class]="searchBoxInvalidClass()"
            pInputText
            id="on_label"
            formControlName="item"
            autocomplete="off"
          />
          <label for="on_label">Search Item</label>
        </p-floatlabel>
        <app-button class="md:mr-2" (buttonClicked)="searchItems()"
          >Search</app-button
        >
        <app-button (buttonClicked)="refreshItems()">Refresh</app-button>
      </form>
      <p-paginator
        (onPageChange)="onPageChange($event)"
        [first]="first()"
        [rows]="rows()"
        [totalRecords]="totalElements()"
        [rowsPerPageOptions]="[5, 10, 15]"
      />
    </div>
    @if (allItems().length > 0) { @for (item of allItems(); track item.ID) {
    <div
      class="mb-2 border-2 border-indigo-300 dark:border-amber-300 rounded-lg"
    >
      <p-card header="{{ item.BrandOrCompany }}: {{ item.Item }}">
        <div class="m-0 grid-container">
          <div
            class="one center-content border-2 border-indigo-300 dark:border-amber-300 rounded-lg p-4 m-1"
          >
            Number of boxes per carton: {{ item.NumOfBoxes }}
          </div>
          <div
            class="two center-content border-2 border-indigo-300 dark:border-amber-300 rounded-lg p-4 m-1"
          >
            Number of Cartons: {{ item.NumOfCartons }}
          </div>
          <div
            class="three center-content border-2 border-indigo-300 dark:border-amber-300 rounded-lg p-4 m-1"
          >
            Price per carton: {{ item.PricePerCarton }}
          </div>
          <div
            class="four center-content border-2 border-indigo-300 dark:border-amber-300 rounded-lg p-4 m-1"
          >
            Subtotal: {{ item.SubTotal }}
          </div>
          <div class="five items-center flex justify-center">
            Action:&nbsp;<app-complete
              [itemToBeCompleted]="item"
              (toaster)="changeState($event)"
            />
          </div>
          <div class="hidden six md:block"></div>
        </div>
      </p-card>
    </div>
    } } @else {
    <app-spinner class="flex items-center justify-center" />
    }
    <p-toast position="bottom-right" key="br" />
  `,
  styles: [
    `
      .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
          'one two three'
          'four five six';
      }
      .center-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .one {
        grid-area: one;
      }
      .two {
        grid-area: two;
      }
      .three {
        grid-area: three;
      }
      .four {
        grid-area: four;
      }
      .five {
        grid-area: five;
      }
      .six {
        grid-area: six;
      }
      @media (max-width: 768px) {
        .grid-container {
          grid-template-columns: 1fr;
          grid-template-areas:
            'one'
            'two'
            'three'
            'four'
            'five';
        }
      }
    `,
  ],
  providers: [MessageService],
})
export class ItemsComponent implements OnInit, OnDestroy {
  #inventoryService = inject(InventoryService);
  #fb = inject(FormBuilder);
  #messageService = inject(MessageService);
  searchForm = this.#fb.group({
    item: this.#fb.control('', [Validators.required]),
  });
  unsubscribe$ = new Subject<void>();
  allItems = signal<InventoryItem[]>([]);
  total = signal<number>(1);
  totalElements = signal<number>(0);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(5);
  first = signal<number>(0);
  rows = signal<number>(5);
  title = signal<string>('');
  searchBoxInvalidClass = signal<string>('');
  showAddItem = signal<boolean>(false);
  state = signal<string>('');

  public ngOnInit(): void {
    this.getItems();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getItems(): void {
    this.first.set(0);
    this.allItems.set([]);
    this.#inventoryService.stateObservable$
      .pipe(
        switchMap((res: InventoryState) => {
          if (res === 'Ordered') {
            this.showAddItem.set(true);
          } else {
            this.showAddItem.set(false);
          }
          this.state.set(res);
          this.pageNumber.set(1);
          this.pageSize.set(5);
          return this.#inventoryService.getAllInventoryItems(
            this.pageNumber(),
            this.pageSize(),
            this.title(),
            this.state()
          );
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (res: InventoryResponseInterface) => {
          this.allItems.set(res.inventoryItems);
          this.total.set(res.total);
          this.totalElements.set(res.totalElements);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler(err);
        },
      });
  }

  private errorHandler(err: HttpErrorResponse): void {
    let errorMsg = 'An unexpected error occurred';

    if (err.error && typeof err.error === 'object') {
      if (err.error.error) {
        errorMsg = err.error.error;
      } else if (err.error.message) {
        errorMsg = err.error.message;
      }
    } else if (typeof err.error === 'string') {
      errorMsg = err.error;
    } else if (err.message) {
      errorMsg = err.message;
    }
    this.messageService({ type: 'error', message: errorMsg });
  }

  public searchItems(): void {
    if (this.searchForm.invalid) {
      this.searchBoxInvalidClass.set('ng-invalid ng-dirty');
    } else {
      this.searchBoxInvalidClass.set('');
      this.title.set(this.searchForm.controls.item.getRawValue() ?? '');
      this.getItems();
    }
  }

  public refreshItems(): void {
    this.searchBoxInvalidClass.set('');
    this.title.set('');
    this.searchForm.reset({ item: '' });
    this.getItems();
  }

  onPageChange(event: PaginatorState) {
    const pageNumber = (event.page ?? 0) + 1;
    const pageSize = event.rows ?? 5;
    this.pageNumber.set(pageNumber);
    this.pageSize.set(pageSize);
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 5);
    this.allItems.set([]);
    this.#inventoryService
      .getAllInventoryItems(
        this.pageNumber(),
        this.pageSize(),
        this.title(),
        this.state()
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: InventoryResponseInterface) => {
          this.allItems.set(res.inventoryItems);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler(err);
        },
      });
  }

  messageService(event: { type: string; message: string }): void {
    this.#messageService.add({
      severity: event.type,
      summary: event.type,
      detail: event.message,
      key: 'br',
      life: 3000,
    });
    if (event.type === 'success') {
      this.refreshItems();
    }
  }

  changeState(type: { type: string; message: string }): void {
    if (type.type === 'error') {
      this.messageService(type);
    } else {
      const firstCondition = this.totalElements() % this.pageSize() === 1;
      const secondCondition =
        Math.ceil(this.totalElements() / this.pageSize()) === this.pageNumber();
      if (firstCondition && secondCondition) {
        this.refreshItems();
      } else {
        this.allItems.set([]);
        this.#inventoryService
          .getAllInventoryItems(
            this.pageNumber(),
            this.pageSize(),
            this.title(),
            this.state()
          )
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: (res: InventoryResponseInterface) => {
              this.allItems.set(res.inventoryItems);
              this.total.set(res.total);
              this.totalElements.update((value) => value - 1);
            },
            error: (err: HttpErrorResponse) => {
              this.errorHandler(err);
            },
          });
      }
    }
  }
}
