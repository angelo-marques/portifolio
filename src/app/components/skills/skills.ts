import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

interface SkillCategory {
  key: string;
  icon: string;
  skills: { name: string; level: number }[];
}

interface RepoReference {
  name: string;
  description: string;
  stack: string;
  link: string;
  image: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills" class="skills">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">&lt;{{ translate.t('nav.skills') }} /&gt;</span>
          <h2 class="section-title">{{ translate.t('skills.title') }}</h2>
          <p class="section-subtitle">{{ translate.t('skills.subtitle') }}</p>
          <div class="title-line"></div>
        </div>

        <div class="skills-grid">
          @for (category of categories; track category.key) {
            <div class="skill-card">
              <div class="card-header">
                <span class="card-icon" [innerHTML]="category.icon"></span>
                <h3>{{ translate.t('skills.' + category.key) }}</h3>
              </div>
              <div class="skill-list">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-item">
                    <div class="skill-info">
                      <span class="skill-name">{{ skill.name }}</span>
                      <span class="skill-percent">{{ skill.level }}%</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-fill" [style.width.%]="skill.level"></div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <div class="ai-showcase">
          <div class="ai-content">
            <h3>{{ translate.t('skills.aiShowcaseTitle') }}</h3>
            <p>{{ translate.t('skills.aiShowcaseDescription') }}</p>
            <div class="ai-tags">
              @for (tag of aiFocusTags; track tag) {
                <span>{{ tag }}</span>
              }
            </div>
          </div>
          <div class="ai-images">
            @for (image of aiGallery; track image.alt) {
              <figure class="image-card">
                <img [src]="image.src" [alt]="image.alt" loading="lazy" />
                <figcaption>{{ image.alt }}</figcaption>
              </figure>
            }
          </div>
        </div>

        <div class="repos-section">
          <h3 class="repos-title">{{ translate.t('skills.referenceRepos') }}</h3>
          <div class="repos-grid">
            @for (repo of repositories; track repo.name) {
              <article class="repo-card">
                <img class="repo-image" [src]="repo.image" [alt]="repo.name" loading="lazy" />
                <div class="repo-body">
                  <h4>{{ repo.name }}</h4>
                  <p>{{ repo.description }}</p>
                  <span class="repo-stack">{{ repo.stack }}</span>
                  <a [href]="repo.link" target="_blank" rel="noopener noreferrer"
                    >{{ translate.t('skills.seeRepo') }} →</a
                  >
                </div>
              </article>
            }
          </div>
        </div>

        <div class="soft-skills-section">
          <h3 class="soft-title">{{ translate.t('skills.softSkills') }}</h3>
          <div class="soft-tags">
            @for (skill of softSkills; track skill) {
              <span class="soft-tag">{{ skill }}</span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  translate = inject(TranslateService);

  categories: SkillCategory[] = [
    {
      key: 'backend',
      icon: '&#123;&#125;',
      skills: [
        { name: 'C# / .NET / .NET Core', level: 97 },
        { name: 'ASP.NET Core / Web API', level: 95 },
        { name: 'Entity Framework / LINQ', level: 92 },
        { name: 'Blazor / Razor', level: 85 },
        { name: 'Node.js', level: 75 },
        { name: 'Java', level: 65 },
      ],
    },
    {
      key: 'frontend',
      icon: '&lt;/&gt;',
      skills: [
        { name: 'Angular / TypeScript', level: 90 },
        { name: 'HTML5 / CSS3 / SASS', level: 95 },
        { name: 'JavaScript', level: 92 },
        { name: 'React', level: 75 },
        { name: 'Bootstrap', level: 90 },
        { name: 'Xamarin', level: 70 },
      ],
    },
    {
      key: 'database',
      icon: '&#128451;',
      skills: [
        { name: 'SQL Server', level: 95 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MySQL', level: 85 },
        { name: 'MongoDB', level: 78 },
        { name: 'Cosmos DB', level: 75 },
        { name: 'SQLite / Dapper', level: 80 },
      ],
    },
    {
      key: 'cloud',
      icon: '&#9729;',
      skills: [
        { name: 'Azure (Service Bus, Blob, DevOps)', level: 90 },
        { name: 'Docker / Kubernetes', level: 85 },
        { name: 'AWS', level: 75 },
        { name: 'Google Cloud (GCP)', level: 72 },
        { name: 'RabbitMQ / Kafka', level: 82 },
        { name: 'CI/CD Pipelines', level: 88 },
      ],
    },
    {
      key: 'tools',
      icon: '&#9881;',
      skills: [
        { name: 'Git / GitHub / Bitbucket', level: 95 },
        { name: 'Visual Studio / VS Code', level: 97 },
        { name: 'Azure DevOps / Jira', level: 90 },
        { name: 'Postman / Swagger', level: 92 },
        { name: 'Figma / Draw.io', level: 80 },
        { name: 'Cypress / SonarQube', level: 82 },
      ],
    },
    {
      key: 'ai',
      icon: '&#129302;',
      skills: [
        { name: 'Ollama / LLM', level: 80 },
        { name: 'Llama 3.2 Vision', level: 78 },
        { name: 'AI Agents', level: 75 },
        { name: 'OCR (GdPicture/ImageGear)', level: 82 },
        { name: 'AI-Powered Error Handling', level: 78 },
        { name: 'SAP GUI Automation', level: 85 },
      ],
    },
  ];

  softSkills = [
    'Dinamismo',
    'Comprometimento',
    'Iniciativa',
    'Proatividade',
    'Responsabilidade',
    'Lideranca',
    'Scrum Master',
    'Mentoria',
    'Comunicacao',
    'Pensamento Analitico',
    'Gestao de Equipe',
    'Resolucao de Problemas',
    'Clean Code',
    'Code Review',
    'TDD',
    'DDD',
    'BDD',
    'SOLID',
    'CQRS',
    'Clean Architecture',
  ];

  aiFocusTags = ['LLM Apps', 'RAG', 'Vision AI', 'AI Agents', 'Prompt Engineering', 'Automation'];

  aiGallery = [
    { src: 'images/ai-architecture.svg', alt: 'Arquitetura de IA com APIs e agentes' },
    { src: 'images/ai-analytics.svg', alt: 'Dashboard inteligente para insights de negócio' },
  ];

  repositories: RepoReference[] = [
    {
      name: 'awesome-dotnet-core',
      description:
        'Coleção com bibliotecas, ferramentas e boas práticas para projetos .NET modernos.',
      stack: '.NET • APIs • Arquitetura',
      link: 'https://github.com/thangchung/awesome-dotnet-core',
      image: 'images/repo-dotnet.svg',
    },
    {
      name: 'LangChain',
      description:
        'Referência para construção de aplicações com LLM, agentes e fluxos de IA avançados.',
      stack: 'LLM • Agents • RAG',
      link: 'https://github.com/langchain-ai/langchain',
      image: 'images/repo-ai.svg',
    },
    {
      name: 'Azure Architecture Center',
      description: 'Padrões de arquitetura cloud e integrações para escalar soluções corporativas.',
      stack: 'Cloud • DevOps • Microservices',
      link: 'https://github.com/mspnp/architecture-center',
      image: 'images/repo-cloud.svg',
    },
  ];
}
