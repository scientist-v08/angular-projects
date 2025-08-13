import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  title = 'app-33-canvas';
  canvasDivEl = viewChild<ElementRef<HTMLCanvasElement>>('tableCanvas');
  headers = ['Rāśi', 'Motto', 'Behavior'];
  data = [
    ['Aries', 'I am', 'Detached warrior, acts without personal ambition.'],
    ['Taurus', 'I have', 'Disinterest in possessions, may reject luxury.'],
    ['Gemini', 'I think', 'Disconnected speech, intuitive thinking.'],
    ['Cancer', 'I feel', 'Withdrawn emotions, detached from family ties.'],
    ['Leo', 'I will', 'Leadership without ego, reluctant authority.'],
    [
      'Virgo',
      'I analyze',
      'Indifference to perfection, service without recognition.',
    ],
    ['Libra', 'I harmonize', 'Detached relationships, avoids commitments.'],
    ['Scorpio', 'I desire', 'Mastery of occult, detachment from sensuality.'],
    [
      'Sagittarius',
      'I see',
      'Philosophical renunciation, detachment from travel or fame.',
    ],
    [
      'Capricorn',
      'I use',
      'Renunciation of worldly status, silent discipline.',
    ],
    ['Aquarius', 'I know', 'Detachment from groups, solitary reformer.'],
    [
      'Pisces',
      'I believe',
      'Spiritual enlightenment, loss of worldly illusions.',
    ],
  ];
  canvas: HTMLCanvasElement | undefined;
  ctx: CanvasRenderingContext2D | null | undefined;
  cellWidth = 200;
  additionalCellWidth = 300;
  cellHeight = 50;
  fontSize = 16;
  private platformId = inject(PLATFORM_ID);

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.canvas = this.canvasDivEl()?.nativeElement;
      this.ctx = this.canvas?.getContext('2d');
      if (!this.canvas || !this.ctx) {
        console.error('Canvas or context is not available');
        return;
      }
      this.drawTable();
    }
  }

  private drawTable(): void {
    if (this.ctx && this.canvas) {
      // Clear canvas
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Title background
      const titleHeight = this.cellHeight; // height of title row
      this.ctx.fillStyle = '#f0f0f0';
      this.ctx.fillRect(0, 0, this.canvas.width, titleHeight);

      // Title text
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#000000';
      this.ctx.fillText('Ketu ☋', this.canvas.width / 2, titleHeight / 2);

      // Styling
      this.ctx.font = `${this.fontSize}px Arial`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      // Draw headers
      for (let i = 0; i < this.headers.length; i++) {
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(
          i * this.cellWidth,
          this.cellHeight,
          i === 2 ? this.cellWidth + this.additionalCellWidth : this.cellWidth,
          this.cellHeight
        );
        this.ctx.strokeRect(
          i * this.cellWidth,
          this.cellHeight,
          i === 2 ? this.cellWidth + this.additionalCellWidth : this.cellWidth,
          this.cellHeight
        );
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(
          this.headers[i],
          i === 2
            ? i * this.cellWidth +
                (this.cellWidth + this.additionalCellWidth) / 2
            : i * this.cellWidth + this.cellWidth / 2,
          1.5 * this.cellHeight
        );
      }

      // Draw rows
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.headers.length; j++) {
          this.ctx.fillStyle = '#ffffff';
          this.ctx.fillRect(
            j * this.cellWidth,
            (i + 2) * this.cellHeight,
            j === 2
              ? this.cellWidth + this.additionalCellWidth
              : this.cellWidth,
            this.cellHeight
          );
          this.ctx.strokeRect(
            j * this.cellWidth,
            (i + 2) * this.cellHeight,
            j === 2
              ? this.cellWidth + this.additionalCellWidth
              : this.cellWidth,
            this.cellHeight
          );
          this.ctx.fillStyle = '#000000';
          this.ctx.textAlign = j === 2 ? 'start' : 'center';
          this.ctx.fillText(
            this.data[i][j],
            j === 2
              ? j * this.cellWidth + 12
              : j * this.cellWidth + this.cellWidth / 2,
            (i + 2) * this.cellHeight + this.cellHeight / 2
          );
        }
      }
    }
  }

  downloadImage() {
    const link = document.createElement('a');
    link.download = 'table.jpg';
    if (this.canvas === undefined) {
      return;
    }
    link.href = this.canvas.toDataURL('image/jpeg');
    link.click();
  }
}
