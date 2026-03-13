import { Component, input, output } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'lib-dialog',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  // 1. INPUTS
  header = input<string | undefined>();
  closable = input(true);
  modal = input(true);
  dismissableMask = input(false);
  styleClass = input<string | undefined>();
  style = input<any | undefined>(); // Use 'any' or a more specific type like object/Record<string, any>
  hasFooter = input<boolean>(false);
  visible = input(false); // Signal that acts as both the Input and emits on change

  // 2. OUTPUTS
  visibleChange = output<boolean>();

  /**
   * Closes the dialog by setting the 'visible' model to false and emitting events.
   */
  close() {
    this.visibleChange.emit(false);
  }

  onBackdropClick(event: MouseEvent) {
    if (
      this.dismissableMask() &&
      (event.target as HTMLElement).classList.contains('dialog-backdrop')
    ) {
      this.close();
    }
  }
}
