import {
  Directive,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appWrapContent]',
})
export class WrapContentDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    /*
    const originalContent = this.el.nativeElement.innerHTML;
    const wrapperDiv = this.renderer.createElement('div');
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
    this.renderer.appendChild(this.el.nativeElement, wrapperDiv);
    this.renderer.setProperty(wrapperDiv, 'innerHTML', originalContent);
    */
    // Create new wrapper div
    const wrapperDiv = this.renderer.createElement('div');

    // Get all child nodes
    const childNodes = Array.from(this.el.nativeElement.childNodes);

    // Move each child node to the wrapper div, preserving bindings
    childNodes.forEach((node) => {
      this.renderer.removeChild(this.el.nativeElement, node);
      this.renderer.appendChild(wrapperDiv, node);
    });

    // Add the wrapper div to the original element
    this.renderer.appendChild(this.el.nativeElement, wrapperDiv);
  }
}
