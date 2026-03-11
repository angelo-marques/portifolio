import { Injectable, signal, computed } from '@angular/core';
import ptTranslations from '../i18n/pt.json';
import enTranslations from '../i18n/en.json';

export type Language = 'pt' | 'en';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations: Record<Language, any> = {
    pt: ptTranslations,
    en: enTranslations
  };

  currentLang = signal<Language>('pt');
  isPortuguese = computed(() => this.currentLang() === 'pt');

  constructor() {
    const saved = localStorage.getItem('portfolio-lang') as Language;
    if (saved && (saved === 'pt' || saved === 'en')) {
      this.currentLang.set(saved);
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLang() === 'pt' ? 'en' : 'pt');
  }

  t(key: string): string {
    const keys = key.split('.');
    let result: any = this.translations[this.currentLang()];
    for (const k of keys) {
      result = result?.[k];
    }
    return result ?? key;
  }
}
