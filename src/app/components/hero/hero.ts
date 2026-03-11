import { Component, inject, OnDestroy, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="home" class="hero">
      <canvas #particleCanvas class="particle-canvas"></canvas>

      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            <span>{{ translate.t('hero.yearsExp') }}</span>
          </div>
          <p class="hero-greeting">{{ translate.t('hero.greeting') }}</p>
          <h1 class="hero-name">
            <span class="name-line">{{ translate.t('hero.name') }}</span>
          </h1>
          <div class="hero-title-wrapper">
            <span class="hero-title-prefix">&gt;&gt;</span>
            <h2 class="hero-title typing">{{ translate.t('hero.title') }}</h2>
          </div>
          <p class="hero-subtitle">{{ translate.t('hero.subtitle') }}</p>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">18+</span>
              <span class="stat-label">{{ translate.isPortuguese() ? 'Anos de Exp.' : 'Years Exp.' }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">50+</span>
              <span class="stat-label">{{ translate.isPortuguese() ? 'Projetos' : 'Projects' }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">12+</span>
              <span class="stat-label">{{ translate.isPortuguese() ? 'Empresas' : 'Companies' }}</span>
            </div>
          </div>

          <div class="hero-actions">
            <a href="#contact" class="btn btn-primary">
              <span>{{ translate.t('hero.cta') }}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#about" class="btn btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Code Editor Mockup -->
        <div class="hero-visual">
          <div class="code-editor">
            <div class="editor-header">
              <div class="editor-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="editor-tabs">
                <span class="tab active">Profile.cs</span>
                <span class="tab">skills.ts</span>
                <span class="tab">docker.yml</span>
              </div>
            </div>
            <div class="editor-body">
              <div class="line-numbers">
                @for (n of lineNumbers; track n) {
                  <span>{{ n }}</span>
                }
              </div>
              <div class="code-content">
                <div class="code-line"><span class="kw">namespace</span> <span class="ns">Portfolio</span>;</div>
                <div class="code-line"></div>
                <div class="code-line"><span class="kw">public class</span> <span class="cn">Developer</span></div>
                <div class="code-line">{{ '{' }}</div>
                <div class="code-line">  <span class="kw">public string</span> Name =&gt; <span class="st">"Angelo Marques"</span>;</div>
                <div class="code-line">  <span class="kw">public string</span> Role =&gt; <span class="st">"Tech Lead"</span>;</div>
                <div class="code-line">  <span class="kw">public int</span> Experience =&gt; <span class="nm">18</span>;</div>
                <div class="code-line"></div>
                <div class="code-line">  <span class="kw">public</span> List&lt;<span class="kw">string</span>&gt; Skills =&gt;</div>
                <div class="code-line">  [</div>
                <div class="code-line">    <span class="st">"C#"</span>, <span class="st">".NET"</span>, <span class="st">"Angular"</span>,</div>
                <div class="code-line">    <span class="st">"Azure"</span>, <span class="st">"Docker"</span>, <span class="st">"AI"</span></div>
                <div class="code-line">  ];</div>
                <div class="code-line"></div>
                <div class="code-line">  <span class="kw">public bool</span> Available =&gt; <span class="bl">true</span>;</div>
                <div class="code-line">  <span class="kw">public string</span> Location =&gt;</div>
                <div class="code-line">    <span class="st">"Vitoria, ES - Brasil"</span>;</div>
                <div class="code-line">{{ '}' }}</div>
              </div>
            </div>
            <div class="editor-status">
              <span>C# <span class="sep">&#9679;</span> UTF-8</span>
              <span>Ln 18, Col 1</span>
            </div>
          </div>

          <!-- Floating orbs around the editor -->
          <div class="orb orb-1"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
          <div class="orb orb-2"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg></div>
          <div class="orb orb-3"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
          <div class="orb orb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2m-9-11h2m18 0h2m-3.3-6.7-1.4 1.4M6.7 17.3l-1.4 1.4m0-13.4 1.4 1.4m10.6 10.6 1.4 1.4"/></svg></div>
        </div>
      </div>

      <div class="hero-tech-stack">
        <span class="tech-label">Tech Stack</span>
        <div class="tech-icons">
          <span class="tech-icon">C#</span>
          <span class="tech-icon">.NET</span>
          <span class="tech-icon">Angular</span>
          <span class="tech-icon">TS</span>
          <span class="tech-icon">Azure</span>
          <span class="tech-icon">Docker</span>
          <span class="tech-icon">AI</span>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="mouse"><div class="wheel"></div></div>
        <span>Scroll</span>
      </div>
    </section>
  `,
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnDestroy {
  translate = inject(TranslateService);
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('particleCanvas');
  private animationId = 0;
  private particles: any[] = [];
  lineNumbers = Array.from({ length: 18 }, (_, i) => i + 1);

  constructor() {
    afterNextRender(() => this.initParticles());
  }

  private initParticles() {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * canvasEl.width,
        y: Math.random() * canvasEl.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvasEl.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvasEl.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${p.opacity})`;
        ctx.fill();
        this.particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  ngOnDestroy() { cancelAnimationFrame(this.animationId); }
}
