import { Component, ElementRef, viewChild, afterNextRender, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-code-rain',
  standalone: true,
  template: `<canvas #rainCanvas class="code-rain-canvas"></canvas>`,
  styles: [`
    .code-rain-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.07;
    }
  `]
})
export class CodeRainComponent implements OnDestroy {
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('rainCanvas');
  private animationId = 0;

  constructor() {
    afterNextRender(() => this.initRain());
  }

  private initRain() {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const chars = 'const let var function class interface import export async await return if else for while switch case break new this => {} [] () ; : . + - * / = < > ! & | ^ ~ # @ $ ? 01'.split(' ');
    const fontSize = 14;
    let columns: number;
    let drops: number[];

    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
      columns = Math.floor(canvasEl.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.05)';
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.fillStyle = '#00f3ff';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? '#7b68ee' : '#00f3ff';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvasEl.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
      this.animationId = requestAnimationFrame(draw);
    };
    draw();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
