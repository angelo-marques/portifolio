import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="about">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">&lt;{{ translate.t('nav.about') }} /&gt;</span>
          <h2 class="section-title">{{ translate.t('about.title') }}</h2>
          <div class="title-line"></div>
        </div>

        <div class="about-grid">
          <!-- Left: Dev workspace illustration -->
          <div class="about-visual">
            <div class="dev-workspace">
              <!-- Monitor SVG -->
              <div class="ws-monitor">
                <svg viewBox="0 0 300 200" class="monitor-svg">
                  <!-- Monitor frame -->
                  <rect x="10" y="10" width="280" height="160" rx="8" fill="rgba(13,17,38,0.95)" stroke="rgba(0,243,255,0.2)" stroke-width="1.5"/>
                  <!-- Screen content - code lines -->
                  <rect x="25" y="30" width="60" height="3" rx="1.5" fill="rgba(86,156,214,0.6)"/>
                  <rect x="90" y="30" width="80" height="3" rx="1.5" fill="rgba(78,201,176,0.5)"/>
                  <rect x="25" y="42" width="40" height="3" rx="1.5" fill="rgba(206,145,120,0.5)"/>
                  <rect x="70" y="42" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
                  <rect x="25" y="54" width="120" height="3" rx="1.5" fill="rgba(0,243,255,0.3)"/>
                  <rect x="150" y="54" width="50" height="3" rx="1.5" fill="rgba(123,104,238,0.4)"/>
                  <rect x="25" y="66" width="30" height="3" rx="1.5" fill="rgba(86,156,214,0.6)"/>
                  <rect x="60" y="66" width="90" height="3" rx="1.5" fill="rgba(206,145,120,0.5)"/>
                  <rect x="25" y="78" width="70" height="3" rx="1.5" fill="rgba(78,201,176,0.5)"/>
                  <rect x="100" y="78" width="40" height="3" rx="1.5" fill="rgba(181,206,168,0.5)"/>
                  <rect x="25" y="90" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>
                  <rect x="25" y="102" width="55" height="3" rx="1.5" fill="rgba(86,156,214,0.6)"/>
                  <rect x="85" y="102" width="75" height="3" rx="1.5" fill="rgba(0,243,255,0.3)"/>
                  <rect x="25" y="114" width="85" height="3" rx="1.5" fill="rgba(206,145,120,0.5)"/>
                  <rect x="25" y="126" width="45" height="3" rx="1.5" fill="rgba(123,104,238,0.4)"/>
                  <rect x="75" y="126" width="65" height="3" rx="1.5" fill="rgba(78,201,176,0.5)"/>
                  <rect x="25" y="138" width="110" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
                  <rect x="25" y="150" width="50" height="3" rx="1.5" fill="rgba(0,243,255,0.3)"/>
                  <!-- Cursor blink -->
                  <rect x="80" y="150" width="2" height="8" fill="rgba(0,243,255,0.8)" class="cursor-blink"/>
                  <!-- Terminal section -->
                  <rect x="190" y="25" width="90" height="140" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
                  <rect x="198" y="35" width="30" height="2" rx="1" fill="rgba(0,255,136,0.5)"/>
                  <rect x="198" y="44" width="60" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                  <rect x="198" y="53" width="45" height="2" rx="1" fill="rgba(0,243,255,0.3)"/>
                  <rect x="198" y="62" width="55" height="2" rx="1" fill="rgba(255,255,255,0.08)"/>
                  <rect x="198" y="71" width="35" height="2" rx="1" fill="rgba(0,255,136,0.4)"/>
                  <rect x="198" y="80" width="70" height="2" rx="1" fill="rgba(255,255,255,0.1)"/>
                  <!-- Stand -->
                  <rect x="130" y="172" width="40" height="6" rx="2" fill="rgba(255,255,255,0.08)"/>
                  <rect x="110" y="178" width="80" height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
                </svg>

                <!-- Glow behind monitor -->
                <div class="monitor-glow"></div>
              </div>

              <!-- Floating mini code cards -->
              <div class="mini-card mini-1">
                <span class="mini-lang">C#</span>
                <div class="mini-lines">
                  <span style="width:80%"></span>
                  <span style="width:60%"></span>
                  <span style="width:90%"></span>
                </div>
              </div>
              <div class="mini-card mini-2">
                <span class="mini-lang">TS</span>
                <div class="mini-lines">
                  <span style="width:70%"></span>
                  <span style="width:85%"></span>
                  <span style="width:50%"></span>
                </div>
              </div>
              <div class="mini-card mini-3">
                <span class="mini-lang">SQL</span>
                <div class="mini-lines">
                  <span style="width:90%"></span>
                  <span style="width:55%"></span>
                  <span style="width:75%"></span>
                </div>
              </div>

              <!-- Connection lines -->
              <svg class="connection-lines" viewBox="0 0 400 350">
                <line x1="50" y1="80" x2="100" y2="120" stroke="rgba(0,243,255,0.1)" stroke-width="1" stroke-dasharray="4"/>
                <line x1="350" y1="60" x2="280" y2="100" stroke="rgba(123,104,238,0.1)" stroke-width="1" stroke-dasharray="4"/>
                <line x1="320" y1="280" x2="270" y2="230" stroke="rgba(0,255,136,0.1)" stroke-width="1" stroke-dasharray="4"/>
              </svg>
            </div>
          </div>

          <!-- Right: Text + Highlights -->
          <div class="about-right">
            <div class="about-text">
              <p>{{ translate.t('about.description') }}</p>
              <p>{{ translate.t('about.description2') }}</p>
              <p>{{ translate.t('about.description3') }}</p>

              <div class="about-info">
                <div class="info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{{ translate.t('about.location') }}</span>
                </div>
                <div class="info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <div class="langs">
                    <span>{{ translate.t('about.portuguese') }}</span>
                    <span>{{ translate.t('about.english') }}</span>
                    <span>{{ translate.t('about.spanish') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="about-highlights">
              <div class="highlight-card">
                <div class="highlight-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>{{ translate.t('about.highlight1Title') }}</h3>
                <p>{{ translate.t('about.highlight1Desc') }}</p>
              </div>
              <div class="highlight-card">
                <div class="highlight-icon purple">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3>{{ translate.t('about.highlight2Title') }}</h3>
                <p>{{ translate.t('about.highlight2Desc') }}</p>
              </div>
              <div class="highlight-card">
                <div class="highlight-icon green">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h3>{{ translate.t('about.highlight3Title') }}</h3>
                <p>{{ translate.t('about.highlight3Desc') }}</p>
              </div>
              <div class="highlight-card">
                <div class="highlight-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
                  </svg>
                </div>
                <h3>{{ translate.t('about.highlight4Title') }}</h3>
                <p>{{ translate.t('about.highlight4Desc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.scss'
})
export class AboutComponent {
  translate = inject(TranslateService);
}
