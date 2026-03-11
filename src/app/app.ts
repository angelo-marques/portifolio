import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { EducationComponent } from './components/education/education';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { CodeRainComponent } from './components/code-rain/code-rain';
import { FloatingCodeComponent } from './components/floating-code/floating-code';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    CodeRainComponent,
    FloatingCodeComponent
  ],
  template: `
    <app-code-rain />
    <app-floating-code />
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-education />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
    }
    main {
      overflow-x: hidden;
      position: relative;
      z-index: 1;
    }
  `]
})
export class App {}
