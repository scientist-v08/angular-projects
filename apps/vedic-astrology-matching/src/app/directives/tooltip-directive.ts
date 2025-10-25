import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[minimalTooltip]',
  standalone: true,
})
export class MinimalTooltipDirective implements OnDestroy {
  tooltipText = input<string>('');
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  delay = input<number>(200);
  isOpen = false;

  private tooltipElement: HTMLElement | null = null;
  private hideTimeout: any;
  private showTimeout: any;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation(); // Prevent bubbling
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Click anywhere else → close tooltip
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isOpen && !this.el.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  private show() {
    if (!this.tooltipText || this.tooltipElement) return;
    this.isOpen = true;

    this.tooltipElement = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText());
    this.renderer.appendChild(this.tooltipElement, text);

    // Style tooltip
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', '#333');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '6px 10px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'transition', 'opacity 0.2s');
    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');

    this.renderer.appendChild(document.body, this.tooltipElement);
    this.positionTooltip();

    setTimeout(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      }
    }, 10);
  }

  private hide() {
    if (!this.tooltipElement) return;
    this.isOpen = false;

    this.renderer.setStyle(this.tooltipElement, 'opacity', '0');
    setTimeout(() => {
      if (this.tooltipElement && this.tooltipElement.parentNode) {
        this.renderer.removeChild(document.body, this.tooltipElement);
        this.tooltipElement = null;
      }
    }, 200);
  }

  private positionTooltip() {
    if (!this.tooltipElement) return;

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    let top: number, left: number;

    switch (this.position()) {
      case 'top':
        top = hostPos.top - tooltipRect.height - 8;
        left = hostPos.left + (hostPos.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + 8;
        left = hostPos.left + (hostPos.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - tooltipRect.height) / 2;
        left = hostPos.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - tooltipRect.height) / 2;
        left = hostPos.right + 8;
        break;
      default:
        top = hostPos.top - tooltipRect.height - 8;
        left = hostPos.left + (hostPos.width - tooltipRect.width) / 2;
    }

    // Keep within viewport
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    if (left < 8) left = 8;
    if (left + tooltipRect.width > viewport.width - 8) {
      left = viewport.width - tooltipRect.width - 8;
    }
    if (top < 8) top = hostPos.bottom + 8;
    if (top + tooltipRect.height > viewport.height - 8) {
      top = viewport.height - tooltipRect.height - 8;
    }

    this.renderer.setStyle(
      this.tooltipElement,
      'top',
      `${top + window.scrollY}px`
    );
    this.renderer.setStyle(
      this.tooltipElement,
      'left',
      `${left + window.scrollX}px`
    );
  }

  ngOnDestroy() {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
    this.hide();
  }
}
