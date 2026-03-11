import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <span class="logo-bracket">&lt;</span>
            <span class="logo-text">Angelo Marques</span>
            <span class="logo-bracket">/&gt;</span>
          </div>

          <div class="footer-nav">
            <a href="#home">{{ translate.t('nav.home') }}</a>
            <a href="#about">{{ translate.t('nav.about') }}</a>
            <a href="#skills">{{ translate.t('nav.skills') }}</a>
            <a href="#experience">{{ translate.t('nav.experience') }}</a>
            <a href="#contact">{{ translate.t('nav.contact') }}</a>
          </div>

          <div class="footer-bottom">
            <p>&copy; {{ currentYear }} Angelo Marques de Oliveira Silva. {{ translate.t('footer.rights') }}.</p>
            <p class="made-with">
              {{ translate.t('footer.madeWith') }}
              <span class="heart">&#9829;</span>
              {{ translate.t('footer.and') }}
              <span class="coffee">&#9749;</span>
              {{ translate.t('footer.coffee') }}
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.scss'
})
export class FooterComponent {
  translate = inject(TranslateService);
  currentYear = new Date().getFullYear();
}
