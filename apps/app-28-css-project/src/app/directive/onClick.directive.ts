import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'button[appOnClicked]',
  standalone: true,
})
export class OnClickedDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  appOnClicked = output<boolean>();

  @HostListener('mousedown')
  onClick(): void {
    const targetElement = this.el.nativeElement.querySelector('.section__icon');
    if (targetElement) {
      this.appOnClicked.emit(true);
      this.renderer.removeClass(targetElement, 'section__icon');
      this.renderer.addClass(targetElement, 'section__icon-close');
    } else {
      const closeTargetElement = this.el.nativeElement.querySelector(
        '.section__icon-close'
      );
      this.appOnClicked.emit(false);
      this.renderer.removeClass(closeTargetElement, 'section__icon-close');
      this.renderer.addClass(closeTargetElement, 'section__icon');
    }
  }
}
