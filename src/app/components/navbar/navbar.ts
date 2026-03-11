import { Component, inject, signal, HostListener } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="nav-container">
        <a href="#home" class="nav-logo">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">AM</span>
          <span class="logo-bracket">/&gt;</span>
        </a>

        <div class="nav-menu" [class.active]="menuOpen()">
          <a href="#home" class="nav-link" (click)="closeMenu()">{{ translate.t('nav.home') }}</a>
          <a href="#about" class="nav-link" (click)="closeMenu()">{{ translate.t('nav.about') }}</a>
          <a href="#skills" class="nav-link" (click)="closeMenu()">{{ translate.t('nav.skills') }}</a>
          <a href="#experience" class="nav-link" (click)="closeMenu()">{{ translate.t('nav.experience') }}</a>
          <a href="#education" class="nav-link" (click)="closeMenu()">{{ translate.t('nav.education') }}</a>
          <a href="#contact" class="nav-link" (click)="closeMenu()">{{ translate.t('nav.contact') }}</a>

          <button class="lang-toggle" (click)="translate.toggleLanguage()">
            <span class="lang-flag">{{ translate.isPortuguese() ? '🇺🇸' : '🇧🇷' }}</span>
            <span class="lang-label">{{ translate.isPortuguese() ? 'EN' : 'PT' }}</span>
          </button>
        </div>

        <button class="nav-hamburger" (click)="toggleMenu()" [class.active]="menuOpen()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `,
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  translate = inject(TranslateService);
  isScrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
