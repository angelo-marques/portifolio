import {
  Component,
  inject,
  ElementRef,
  viewChild,
  afterNextRender,
  OnDestroy,
} from '@angular/core';
import { TranslateService } from '../../services/translate.service';

interface Experience {
  company: string;
  role_pt: string;
  role_en: string;
  period: string;
  location: string;
  description_pt: string;
  description_en: string;
  techs: string[];
  highlights_pt: string[];
  highlights_en: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="experience">
      <canvas #expRainCanvas class="exp-rain-canvas"></canvas>
      <div class="container">
        <div class="section-header">
          <span class="section-tag">&lt;{{ translate.t('nav.experience') }} /&gt;</span>
          <h2 class="section-title">{{ translate.t('experience.title') }}</h2>
          <p class="section-subtitle">{{ translate.t('experience.subtitle') }}</p>
          <div class="title-line"></div>
        </div>

        <div class="timeline">
          @for (exp of experiences; track exp.company + exp.period; let i = $index) {
            <div class="timeline-item" [class.left]="i % 2 === 0" [class.right]="i % 2 !== 0">
              <div class="timeline-dot">
                <span class="dot-inner"></span>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <h3 class="company">{{ exp.company }}</h3>
                  <span class="period">{{ exp.period }}</span>
                </div>
                <h4 class="role">{{ translate.isPortuguese() ? exp.role_pt : exp.role_en }}</h4>
                <span class="location">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ exp.location }}
                </span>
                @let codeLines = getExperienceCode(exp);
                <div class="experience-editor">
                  <div class="editor-header">
                    <div class="editor-dots">
                      <span class="dot red"></span>
                      <span class="dot yellow"></span>
                      <span class="dot green"></span>
                    </div>
                    <div class="editor-tabs">
                      <span class="tab active">{{ getExperienceFileName(exp) }}</span>
                      <span class="tab">skills.cs</span>
                      <span class="tab">mission.md</span>
                    </div>
                  </div>

                  <div class="editor-body">
                    <div class="line-numbers">
                      @for (line of codeLines; track $index; let n = $index) {
                        <span>{{ n + 1 }}</span>
                      }
                    </div>
                    <div class="code-content">
                      @for (line of codeLines; track $index) {
                        <div class="code-line">{{ line }}</div>
                      }
                      <div class="code-line cursor-line">
                        <span class="cursor">_</span>
                      </div>
                    </div>
                  </div>

                  <div class="editor-status">
                    <span>C# <span class="sep">&#9679;</span> UTF-8</span>
                    <span>{{ exp.period }}</span>
                  </div>
                </div>

                <p class="experience-summary">
                  {{ translate.isPortuguese() ? exp.description_pt : exp.description_en }}
                </p>

                @if (
                  (translate.isPortuguese() ? exp.highlights_pt : exp.highlights_en).length > 0
                ) {
                  <ul class="highlights">
                    @for (
                      h of translate.isPortuguese() ? exp.highlights_pt : exp.highlights_en;
                      track h
                    ) {
                      <li>{{ h }}</li>
                    }
                  </ul>
                }

                @if (exp.techs.length > 0) {
                  <div class="tech-tags">
                    @for (tech of exp.techs; track tech) {
                      <span class="tech-tag">{{ tech }}</span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './experience.scss',
})
export class ExperienceComponent implements OnDestroy {
  translate = inject(TranslateService);
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('expRainCanvas');
  private animationId = 0;

  constructor() {
    afterNextRender(() => this.initCodeRain());
  }

  private initCodeRain() {
    const canvasEl = this.canvas()?.nativeElement;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const keywords = [
      'class',
      'public',
      'void',
      'int',
      'string',
      'bool',
      'var',
      'const',
      'let',
      'async',
      'await',
      'return',
      'new',
      'this',
      'if',
      'else',
      'for',
      'while',
      'try',
      'catch',
      'using',
      'namespace',
      'import',
      'export',
      'interface',
      'enum',
      'static',
      'override',
      'abstract',
      'SELECT',
      'FROM',
      'WHERE',
      'INSERT',
      'UPDATE',
      'DELETE',
      'JOIN',
      'docker',
      'build',
      'push',
      'deploy',
      'run',
      'kubectl',
      'apply',
      '=>',
      '{}',
      '()',
      '[]',
      '&&',
      '||',
      '!=',
      '==',
      '<<',
      '>>',
      'C#',
      '.NET',
      'Angular',
      'Azure',
      'SQL',
      'API',
      'REST',
      'Git',
      '0',
      '1',
      'true',
      'false',
      'null',
      'Task',
      'List',
      'IService',
    ];
    const fontSize = 13;
    let columns: number;
    let drops: number[];
    let speeds: number[];

    const resize = () => {
      const rect = canvasEl.parentElement!.getBoundingClientRect();
      canvasEl.width = rect.width;
      canvasEl.height = rect.height;
      columns = Math.floor(canvasEl.width / fontSize);
      drops = Array(columns)
        .fill(0)
        .map(() => Math.random() * -50);
      speeds = Array(columns)
        .fill(0)
        .map(() => 0.3 + Math.random() * 0.7);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.04)';
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = keywords[Math.floor(Math.random() * keywords.length)];
        const r = Math.random();
        if (r > 0.85) {
          ctx.fillStyle = 'rgba(123, 104, 238, 0.18)';
        } else if (r > 0.7) {
          ctx.fillStyle = 'rgba(0, 255, 136, 0.15)';
        } else {
          ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
        }
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvasEl.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
      this.animationId = requestAnimationFrame(draw);
    };
    draw();
  }

  getExperienceCode(exp: Experience): string[] {
    const description = this.translate.isPortuguese() ? exp.description_pt : exp.description_en;
    const role = this.translate.isPortuguese() ? exp.role_pt : exp.role_en;
    const summaryLines = this.wrapText(description.replaceAll("'", '"'), 54, 2);

    return [
      'namespace Portfolio.Experience;',
      '',
      `public class ${this.toSafeClassName(exp.company)}Role`,
      '{',
      `  public string Company => "${exp.company}";`,
      `  public string Role => "${role}";`,
      `  // ${summaryLines[0] ?? ''}`,
      `  // ${summaryLines[1] ?? ''}`,
      `  public string[] Stack => [${exp.techs
        .slice(0, 5)
        .map((tech) => `"${tech}"`)
        .join(', ')}];`,
      '}',
    ];
  }

  getExperienceFileName(exp: Experience): string {
    return `${exp.company
      .toLowerCase()
      .replaceAll(' ', '-')
      .replace(/[^a-z0-9-]/g, '')}.cs`;
  }

  private wrapText(text: string, limit: number, maxLines: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length <= limit) {
        current = next;
      } else {
        lines.push(current);
        current = word;
        if (lines.length === maxLines - 1) break;
      }
    }

    if (lines.length < maxLines && current) {
      lines.push(current);
    }

    return lines.map((line, idx) =>
      idx === maxLines - 1 && words.join(' ').length > line.length ? `${line}...` : line,
    );
  }

  private toSafeClassName(company: string): string {
    return company
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  experiences: Experience[] = [
    {
      company: 'Outly',
      role_pt: 'Lider Tecnico',
      role_en: 'Tech Lead',
      period: 'Ago 2025 - Jan 2026',
      location: 'Remoto',
      description_pt:
        'Atuei como Lider Tecnico em um ecossistema complexo de securitizacao, gerenciando um sistema legado critico e direcionando o time para praticas modernas de desenvolvimento.',
      description_en:
        'Acted as Tech Lead in a complex securitization ecosystem, managing a critical legacy system and directing the team towards modern development practices.',
      techs: ['C#', '.NET', 'Azure', 'AWS', 'SQL Server', 'Scrum'],
      highlights_pt: [
        'Lideranca e mentoria no processo de securitizacao',
        'Reducao de debitos tecnicos e mitigacao de bugs',
        'Adocao de ferramentas de IA para otimizar o fluxo de desenvolvimento',
        'Migracao de infraestrutura de Azure para AWS',
      ],
      highlights_en: [
        'Leadership and mentoring in securitization process',
        'Technical debt reduction and bug mitigation',
        'AI tools adoption to optimize development flow',
        'Infrastructure migration from Azure to AWS',
      ],
    },
    {
      company: 'Gnose Tecnologia',
      role_pt: 'Proprietario da Empresa',
      role_en: 'Company Owner',
      period: 'Jun 2016 - Jan 2026',
      location: 'Espirito Santo, Brasil',
      description_pt:
        'Empresa de consultoria de desenvolvimento e outsourcing atuando com diversas tecnologias em projetos de meio de pagamento, servicos bancarios, mobilidade urbana e e-commerce.',
      description_en:
        'Development consulting and outsourcing company working with various technologies in payment, banking services, urban mobility and e-commerce projects.',
      techs: ['C#', '.NET', 'Angular', 'Azure', 'SQL Server', 'Docker'],
      highlights_pt: [],
      highlights_en: [],
    },
    {
      company: 'Osas',
      role_pt: 'Lider Tecnico Senior',
      role_en: 'Senior Tech Lead',
      period: 'Set 2024 - Jul 2025',
      location: 'Minas Gerais, Brasil',
      description_pt:
        'Tech Lead Full Stack Developer no time Scan, focado em melhores praticas de desenvolvimento, colaboracao entre times e inovacao com IA.',
      description_en:
        'Tech Lead Full Stack Developer in the Scan team, focused on best development practices, team collaboration, and AI innovation.',
      techs: ['C#', '.NET', 'Angular', 'Ollama', 'LLM', 'GdPicture', 'SQL Server'],
      highlights_pt: [
        'Projetos com IA usando Ollama e LLM llama 3.2 vision',
        'Atualizacao de sistema legado com estabilidade e performance',
        'Contratacao e entrevistas tecnicas',
        'Melhoria de performance em banco de dados e indices',
      ],
      highlights_en: [
        'AI projects using Ollama and LLM llama 3.2 vision',
        'Legacy system update with stability and performance',
        'Hiring and technical interviews',
        'Database and index performance improvement',
      ],
    },
    {
      company: 'Niteo Technologies',
      role_pt: 'Desenvolvedor Senior',
      role_en: 'Senior Developer',
      period: 'Dez 2023 - Jul 2024',
      location: 'Remoto',
      description_pt:
        'Desenvolvimento de robos de automacao usando SAP Gui para a Ericsson, criacao de robos de extracao para prefeituras e projeto Sinqia com Cosmos DB.',
      description_en:
        'Development of automation robots using SAP Gui for Ericsson, creation of extraction robots for municipalities, and Sinqia project with Cosmos DB.',
      techs: ['C#', 'SAP Gui', 'SQL Server', 'Cosmos DB', 'Azure Blob'],
      highlights_pt: [
        'Arquiteto de solucao para robos de automacao',
        'Automacao de processos para Ericsson e prefeituras',
        'Sistema de autenticacao com Cosmos DB e Blob',
      ],
      highlights_en: [
        'Solution architect for automation robots',
        'Process automation for Ericsson and municipalities',
        'Authentication system with Cosmos DB and Blob',
      ],
    },
    {
      company: 'Grupo Barigui',
      role_pt: 'Desenvolvedor Full Stack / Arquiteto de Solucao',
      role_en: 'Full Stack Developer / Solution Architect',
      period: 'Jun 2023 - Dez 2023',
      location: 'Curitiba, Parana, Brasil',
      description_pt:
        'Treinamento de equipe em SOLID, Clean Code, CQRS, TDD e DDD. Arquitetura Hexagonal com RabbitMQ, Docker no GCP e Kubernetes.',
      description_en:
        'Team training in SOLID, Clean Code, CQRS, TDD and DDD. Hexagonal architecture with RabbitMQ, Docker on GCP and Kubernetes.',
      techs: ['C#', '.NET Core', 'Angular', 'RabbitMQ', 'Docker', 'Kubernetes', 'GCP', 'Cypress'],
      highlights_pt: [
        'Arquitetura Hexagonal (Ports and Adapters)',
        'Automacao de testes com Cypress e SonarQube',
        'Microsservicos com Docker e Kubernetes no GCP',
      ],
      highlights_en: [
        'Hexagonal Architecture (Ports and Adapters)',
        'Test automation with Cypress and SonarQube',
        'Microservices with Docker and Kubernetes on GCP',
      ],
    },
    {
      company: 'Beta Learning',
      role_pt: 'Desenvolvedor .NET Senior',
      role_en: 'Senior .NET Developer',
      period: 'Nov 2022 - Jun 2023',
      location: 'Sao Paulo, Brasil',
      description_pt:
        'Manutencao de sistema legado, novas funcionalidades e suporte em normas de chargeback (CBK) e disputas no setor financeiro.',
      description_en:
        'Legacy system maintenance, new features and support in chargeback (CBK) standards and disputes in the financial sector.',
      techs: ['C#', '.NET Core', 'SQL Server', 'Azure'],
      highlights_pt: [],
      highlights_en: [],
    },
    {
      company: 'Banese Card',
      role_pt: 'Desenvolvedor de Software',
      role_en: 'Software Developer',
      period: 'Mai 2022 - Out 2022',
      location: 'Aracaju, Sergipe, Brasil',
      description_pt:
        'Manutencao e reestruturacao de sistemas legados para .NET Core, processamento de transacoes no mercado de pagamentos (gateway).',
      description_en:
        'Legacy system maintenance and restructuring to .NET Core, transaction processing in payment gateway market.',
      techs: ['C#', '.NET Core', 'SQL Server', 'Elo'],
      highlights_pt: [],
      highlights_en: [],
    },
    {
      company: 'Le Card - Pag24horas',
      role_pt: 'Full Stack / Arquiteto / Lider Tecnico',
      role_en: 'Full Stack / Architect / Tech Lead',
      period: 'Fev 2018 - Jun 2022',
      location: 'Vitoria, Espirito Santo',
      description_pt:
        'Diretor responsavel pelo projeto Pag24horas - sistema de pagamento eletronico. Atuando como desenvolvedor, DBA, analista, gerente de projetos, lider e Scrum Master.',
      description_en:
        'Director responsible for the Pag24horas project - electronic payment system. Acting as developer, DBA, analyst, project manager, leader and Scrum Master.',
      techs: ['C#', '.NET', 'Angular', 'Azure', 'SQL Server', 'Software Express'],
      highlights_pt: [
        'Modelagem de banco de dados e arquitetura do projeto',
        'Homologacao junto a Software Express',
        'Lancamento e conciliacao financeira',
        'Multiplos papeis: Dev, DBA, PM, Scrum Master',
      ],
      highlights_en: [
        'Database modeling and project architecture',
        'Homologation with Software Express',
        'Launch and financial reconciliation',
        'Multiple roles: Dev, DBA, PM, Scrum Master',
      ],
    },
    {
      company: 'V1 App (Globalsys / Grupo Aguia Branca)',
      role_pt: 'Desenvolvedor de Software',
      role_en: 'Software Developer',
      period: 'Jun 2021 - Mai 2022',
      location: 'Espirito Santo, Brasil',
      description_pt:
        'Vice-lider da equipe Assinatura no projeto V1, sistema de assinatura de veiculos automotivos do Grupo Aguia Branca.',
      description_en:
        'Vice-leader of the Subscription team in the V1 project, automotive vehicle subscription system for Grupo Aguia Branca.',
      techs: [
        'C#',
        '.NET Core 3.1',
        '.NET 5',
        'Angular',
        'SQL Server',
        'Redis',
        'Azure Service Bus',
        'DDD',
      ],
      highlights_pt: [],
      highlights_en: [],
    },
    {
      company: 'HRD Corretora de Seguros',
      role_pt: 'Gerente de TI',
      role_en: 'IT Manager',
      period: 'Fev 2009 - Nov 2012',
      location: 'Vitoria, Espirito Santo, Brasil',
      description_pt:
        'Manutencao de aplicacoes, automacao de processos, levantamento de custos e planejamento de solucoes de TI.',
      description_en:
        'Application maintenance, process automation, cost analysis and IT solutions planning.',
      techs: ['IT Management', 'Planning'],
      highlights_pt: [],
      highlights_en: [],
    },
  ];
}
