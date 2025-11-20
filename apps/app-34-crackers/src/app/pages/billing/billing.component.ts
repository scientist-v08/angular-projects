import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { DiscountDropdownInterface } from '../../interfaces/discountDropdown.interface';
import { DropdownInterface } from '../../interfaces/dropdown.interface';
import { ButtonComponent } from '../../components/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsInterface } from '../../interfaces/items.interface';
import { ItemsClass } from '../../components/items.component';
import { GrandTotalComponent } from '../../components/grand-total.component';
import { BillingService } from '../../services/billing.service';
import {
  BillDetailsInterface,
  BillResponseInterface,
} from '../../interfaces/billDetails.interface';
import { Subject, takeUntil } from 'rxjs';
import { BillComparisonInterface } from '../../interfaces/billComparison.interface';
import { BillComparisonComponent } from '../../components/bill-comparison.component';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    ItemsClass,
    GrandTotalComponent,
    BillComparisonComponent,
  ],
  templateUrl: './billing.component.html',
  styles: [
    `
      .grid__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'one two';
        gap: 1rem;
        width: 100%;
        .one {
          grid-area: one;
        }
        .two {
          grid-area: two;
        }
      }

      .gap {
        gap: 1rem;
      }

      input::placeholder {
        color: #312e81;
      }

      .text-red-500 {
        color: red;
      }

      @media (max-width: 768px) {
        .grid__container {
          grid-template-columns: 1fr;
          grid-template-areas:
            'one'
            'two';
        }
      }

      @media (prefers-color-scheme: dark) {
        input::placeholder {
          color: #fcd34d; /* Tailwind's amber-300 */
        }
      }
    `,
  ],
})
export default class BillingComponent implements AfterViewChecked, OnDestroy {
  #fb = inject(FormBuilder);
  #billingService = inject(BillingService);

  billingForm = this.#fb.group({
    discount: this.#fb.control('0.25', [Validators.required]),
    company: this.#fb.control('', [Validators.required]),
    category: this.#fb.control('', [Validators.required]),
    name: this.#fb.control('Venkataramaiah P', [Validators.required]),
    number: this.#fb.control('9945839954', [
      Validators.pattern(/^[6-9]\d{9}$/),
    ]),
    MRP: this.#fb.control(0, [Validators.required]),
    quantity: this.#fb.control(1, [Validators.required]),
  });
  discountDropDownOptions = signal<DiscountDropdownInterface[]>([
    { id: 1, value: '70%', discount: 0.3 },
    { id: 2, value: '75%', discount: 0.25 },
    { id: 3, value: '77%', discount: 0.23 },
    { id: 4, value: '78%', discount: 0.22 },
    { id: 5, value: '80%', discount: 0.2 },
  ]);
  companyDropdown = signal<DropdownInterface[]>([
    { id: 1, value: 'st', item: 'Standard' },
    { id: 2, value: 'ot', item: 'Other/Gift Box' },
  ]);
  categoryDropdown = signal<DropdownInterface[]>([
    { id: 1, value: 'sp', item: 'Sparklers' },
    { id: 2, value: 'fp', item: 'Flower pots' },
    { id: 3, value: 'bc', item: 'Chakra' },
    { id: 4, value: 'dm', item: 'Dum Dum' },
    { id: 5, value: 'fc', item: 'Rockets/Sky-shots' },
    { id: 6, value: 'ss', item: 'Sky shots' },
    { id: 7, value: 'gf', item: 'Gift box' },
  ]);
  showItems = signal<boolean>(false);
  slNo = signal<number>(0);
  items = signal<ItemsInterface[]>([]);
  totalCost = signal<number>(0);
  showTotal = signal<boolean>(false);
  divEl = viewChild<ElementRef>('scroll');
  comparisonDiv = viewChild<ElementRef>('comparison');
  shouldScroll = signal<boolean>(false);
  scrollToCompare = signal<boolean>(false);
  selectAtLeastOneitem = signal<boolean>(false);
  billId = '';
  billComparison = signal<BillComparisonInterface[]>([]);
  showComparisons = signal<boolean>(false);
  unsubscribe$ = new Subject<void>();

  ngAfterViewChecked(): void {
    if (this.shouldScroll() && this.divEl()) {
      this.divEl()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.shouldScroll.set(false);
    }
    if (this.scrollToCompare() && this.comparisonDiv()) {
      this.comparisonDiv()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.scrollToCompare.set(false);
    }
  }

  addItem(): void {
    if (this.billingForm.valid) {
      this.slNo.update((num) => num + 1);
      const obtainedDiscount =
        Number(this.billingForm.controls.discount.getRawValue()) ?? 0;
      const actualDiscount = 100 - obtainedDiscount * 100;
      const newItem: ItemsInterface = {
        slNo: this.slNo(),
        item: `${this.billingForm.controls.company.getRawValue()}: ${this.billingForm.controls.category.getRawValue()}`,
        mrpOrNet: this.billingForm.controls.MRP.getRawValue() ?? 0,
        quantity: this.billingForm.controls.quantity.getRawValue() ?? 0,
        discount:
          this.billingForm.controls.company.getRawValue() === 'Standard'
            ? `${actualDiscount}%`
            : 'NA',
        subTotal: this.subTotalCalculation(
          this.billingForm.controls.company.getRawValue(),
          obtainedDiscount,
          this.billingForm.controls.quantity.getRawValue(),
          this.billingForm.controls.MRP.getRawValue()
        ),
      };
      this.items.update((currentItems) => [...currentItems, newItem]);
      if (!this.showItems()) {
        this.showItems.set(true);
      }
    } else {
      this.billingForm.markAllAsTouched();
    }
  }

  private subTotalCalculation(
    company: string | null,
    discount: number,
    quantity: number | null,
    mrpOrNet: number | null
  ): number {
    if (company) {
      if (company === 'Standard') {
        const subtotal = Math.floor(
          (mrpOrNet as number) * (quantity as number) * discount
        );
        return subtotal ?? 0;
      } else {
        const subtotal = (mrpOrNet as number) * (quantity as number);
        return subtotal ?? 0;
      }
    }
    return 0;
  }

  calculateTotal(): void {
    if (this.items().length > 0) {
      this.selectAtLeastOneitem.set(false);
      this.totalCost.set(
        this.items().reduce((sum, item) => sum + item.subTotal, 0)
      );
      if (!this.showTotal()) {
        this.showTotal.set(true);
      }
      this.shouldScroll.set(true);
    } else {
      this.selectAtLeastOneitem.set(true);
    }
  }

  newBill(): void {
    this.billingForm.setValue({
      discount: '',
      company: '',
      category: '',
      name: '',
      number: '',
      MRP: 0,
      quantity: 1,
    });
    this.showItems.set(false);
    this.showTotal.set(false);
    this.items.set([]);
    this.slNo.set(0);
    this.shouldScroll.set(false);
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.billingForm.markAsUntouched();
  }

  private percentToDecimal(percentStr: string): number {
    const num = parseFloat(percentStr.replace('%', '').trim());
    return isNaN(num) ? 0 : 1 - num / 100;
  }

  onEdited(updatedItem: ItemsInterface) {
    updatedItem.subTotal = this.subTotalCalculation(
      updatedItem.item.startsWith('Standard:') ? 'Standard' : updatedItem.item,
      this.percentToDecimal(updatedItem.discount),
      updatedItem.quantity,
      updatedItem.mrpOrNet
    );
    this.items.update((currentItems) =>
      currentItems.map((item) =>
        item.slNo === updatedItem.slNo ? updatedItem : item
      )
    );
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.calculateTotal();
  }

  deleteItem(index: number): void {
    const actualIndex = index - 1;
    this.items.update((current) => {
      const next = current.filter((_, i) => i !== actualIndex);
      return next.map((it, i) => ({
        ...it,
        slNo: i + 1,
      }));
    });
    this.slNo.update((current) => current - 1);
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.calculateTotal();
  }

  generateBill(): void {
    const requestBody: BillDetailsInterface = {
      user: this.billingForm.controls.name.getRawValue() ?? '',
      mobile: this.billingForm.controls.number.getRawValue() ?? '',
      grandTotal: this.totalCost(),
      billItems: this.items(),
    };
    this.#billingService
      .generateBill(requestBody)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: BillResponseInterface) => {
          const blobUrl = window.URL.createObjectURL(res.file);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          const whatsappTab =
            'https://wa.me/91' +
            (this.billingForm.controls.number.getRawValue() ?? '');
          window.open(whatsappTab, '_blank');
        },
      });
  }

  previewBill(): void {
    const requestBody: BillDetailsInterface = {
      user: this.billingForm.controls.name.getRawValue() ?? '',
      mobile: this.billingForm.controls.number.getRawValue() ?? '',
      grandTotal: this.totalCost(),
      billItems: this.items(),
    };
    this.#billingService
      .generatePreviewBill(requestBody)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: BillResponseInterface) => {
          const blobUrl = window.URL.createObjectURL(res.file);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
          const whatsappTab =
            'https://wa.me/91' +
            (this.billingForm.controls.number.getRawValue() ?? '');
          window.open(whatsappTab, '_blank');
        },
      });
  }

  comparePrices(): void {
    const discountRates = [0.25, 0.24, 0.23, 0.2] as const;
    const comparisons = discountRates.map((rate) =>
      this.#billingService.billComparison(this.items(), rate)
    );
    this.billComparison.set(comparisons);
    this.showComparisons.set(true);
    this.scrollToCompare.set(true);
  }

  finalizedBill(discount: number): void {
    const allItems = this.#billingService.finalizedBill(this.items(), discount);
    this.items.set(allItems);
    this.billComparison.set([]);
    this.showComparisons.set(false);
    this.totalCost.set(
      this.items().reduce(
        (sum, item) => sum + Math.floor(item.subTotal || 0),
        0
      )
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
