import { Component, computed, inject, input, output } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { ButtonComponent } from '../../../components/button.component';
import {
  InventoryStateOrdered,
  InventoryStateReceived,
  InventoryStateUnpacked,
} from '../../../constants/inventory.constants';
import { InventoryItem } from '../../../interfaces/inventory.interface';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  selector: 'app-complete',
  template: `<app-button (buttonClicked)="complete()">{{
    goToState()
  }}</app-button>`,
})
export class CompleteComponent {
  #inventoryService = inject(InventoryService);
  itemToBeCompleted = input.required<InventoryItem>();
  state = this.#inventoryService.state;
  goToState = computed(() => {
    switch (this.state()) {
      case InventoryStateOrdered:
        return InventoryStateReceived;
      case InventoryStateReceived:
        return InventoryStateUnpacked;
      default:
        return InventoryStateReceived;
    }
  });
  unsubscribe$ = new Subject<void>();
  toaster = output<{ type: string; message: string }>();

  complete(): void {
    this.#inventoryService
      .updateInventoryItem(this.itemToBeCompleted())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (val) => {
          this.toaster.emit({ type: 'success', message: val.message });
        },
        error: (err: HttpErrorResponse) => {
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
          this.toaster.emit({ type: 'error', message: errorMsg });
        },
      });
  }
}
