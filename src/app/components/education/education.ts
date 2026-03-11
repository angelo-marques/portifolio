import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section id="education" class="education">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">&lt;{{ translate.t('nav.education') }} /&gt;</span>
          <h2 class="section-title">{{ translate.t('education.title') }}</h2>
          <p class="section-subtitle">{{ translate.t('education.subtitle') }}</p>
          <div class="title-line"></div>
        </div>

        <div class="education-grid">
          <div class="edu-cards">
            <div class="edu-card">
              <div class="edu-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div class="edu-info">
                <h3>Faculdade UniBF</h3>
                <p class="edu-degree">{{ translate.isPortuguese()
                  ? 'Tecnologo em Analise e Desenvolvimento de Sistemas'
                  : 'Technology Degree in Systems Analysis and Development' }}</p>
                <span class="edu-field">{{ translate.isPortuguese() ? 'Tecnologia da Informacao' : 'Information Technology' }}</span>
                <span class="edu-period">Jan 2025 - Jun 2026</span>
                <span class="edu-status active">{{ translate.isPortuguese() ? 'Em andamento' : 'In progress' }}</span>
              </div>
            </div>

            <div class="edu-card">
              <div class="edu-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div class="edu-info">
                <h3>UNICORP Faculdades</h3>
                <p class="edu-degree">{{ translate.isPortuguese()
                  ? 'Tecnico em Desenvolvimento de Sistemas'
                  : 'Technical Degree in Systems Development' }}</p>
                <span class="edu-field">{{ translate.isPortuguese() ? 'Programacao de Computadores' : 'Computer Programming' }}</span>
                <span class="edu-period">Jun 2023 - Ago 2024</span>
                <span class="edu-status completed">{{ translate.isPortuguese() ? 'Concluido' : 'Completed' }}</span>
              </div>
            </div>
          </div>

          <div class="certifications">
            <h3 class="cert-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
              {{ translate.t('education.certifications') }}
            </h3>
            <div class="cert-list">
              @for (cert of certifications; track cert) {
                <div class="cert-item">
                  <span class="cert-dot"></span>
                  <span>{{ cert }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './education.scss'
})
export class EducationComponent {
  translate = inject(TranslateService);

  certifications = [
    'HTML Basico',
    'Curso Completo De CSS',
    'Logica De Programacao I - UFES',
    'Logica de Programacao',
    'Microsoft SharePoint'
  ];
}
