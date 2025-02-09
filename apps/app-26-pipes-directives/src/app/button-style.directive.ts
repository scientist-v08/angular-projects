import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: 'button[appStyleSelector]',
  standalone: true,
})
export class ButtonStyleDirective implements OnChanges {
  @Input() appStyleSelector: 'status' | 'priority' = 'status';
  @Input() value = '';

  @HostBinding('class') elementClass = '';

  ngOnChanges(): void {
    if (this.appStyleSelector === 'status') {
      this.elementClass = this.statusStyleSelector(this.value);
    } else if (this.appStyleSelector === 'priority') {
      this.elementClass = this.priorityStyleSelector(this.value);
    }
  }

  private statusStyleSelector(data: string): string {
    if (data) {
      switch (data.toLowerCase()) {
        case 'open':
          console.log('open');
          return 'btn purple-button';
        case 'closed':
          return 'btn green-button';
        case 'response_received':
          return 'btn blue-button';
        default:
          return 'btn blue-button';
      }
    }
    return 'btn blue-button';
  }

  private priorityStyleSelector(data: string): string {
    if (data) {
      switch (data.toLowerCase()) {
        case 'low':
          return 'btn green-button';
        case 'medium':
          return 'btn orange-button';
        default:
          console.log('high');
          return 'btn red-button';
      }
    }
    return 'btn blue-button';
  }
}
