import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-code',
  standalone: true,
  template: `
    <div class="floating-code-container">
      @for (snippet of snippets; track snippet.id) {
        <div class="floating-snippet"
             [style.top]="snippet.top"
             [style.left]="snippet.left"
             [style.animationDelay]="snippet.delay"
             [style.animationDuration]="snippet.duration"
             [class]="'snippet-' + snippet.color">
          <pre>{{ snippet.code }}</pre>
        </div>
      }

      @for (bracket of brackets; track bracket.id) {
        <div class="floating-bracket"
             [style.top]="bracket.top"
             [style.left]="bracket.left"
             [style.animationDelay]="bracket.delay"
             [style.fontSize]="bracket.size">
          {{ bracket.char }}
        </div>
      }
    </div>
  `,
  styles: [`
    .floating-code-container {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .floating-snippet {
      position: absolute;
      opacity: 0;
      animation: floatSnippet 20s ease-in-out infinite;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      padding: 0.5rem 0.75rem;
      background: rgba(0, 243, 255, 0.03);
      border: 1px solid rgba(0, 243, 255, 0.06);
      border-radius: 8px;
      backdrop-filter: blur(4px);
      white-space: pre;
      line-height: 1.4;

      pre {
        margin: 0;
        color: rgba(0, 243, 255, 0.25);
      }

      &.snippet-purple pre {
        color: rgba(123, 104, 238, 0.25);
      }

      &.snippet-green pre {
        color: rgba(0, 255, 136, 0.2);
      }
    }

    .floating-bracket {
      position: absolute;
      opacity: 0;
      animation: floatBracket 15s ease-in-out infinite;
      font-family: 'JetBrains Mono', monospace;
      color: rgba(0, 243, 255, 0.08);
      font-weight: 700;
    }

    @keyframes floatSnippet {
      0%, 100% { opacity: 0; transform: translateY(20px) rotate(-1deg); }
      10%, 90% { opacity: 1; }
      50% { transform: translateY(-30px) rotate(1deg); }
    }

    @keyframes floatBracket {
      0%, 100% { opacity: 0; transform: translateY(0) rotate(0deg); }
      15%, 85% { opacity: 1; }
      50% { transform: translateY(-60px) rotate(15deg); }
    }
  `]
})
export class FloatingCodeComponent {
  snippets = [
    { id: 1, code: 'public async Task<Result>\n  GetDataAsync()\n{', top: '8%', left: '2%', delay: '0s', duration: '22s', color: 'cyan' },
    { id: 2, code: 'const app = new\n  Angular.Module();', top: '15%', left: '85%', delay: '3s', duration: '25s', color: 'purple' },
    { id: 3, code: '[HttpGet("{id}")]\npublic IActionResult\n  Get(int id)', top: '35%', left: '1%', delay: '6s', duration: '20s', color: 'green' },
    { id: 4, code: 'docker-compose up\n  --build -d', top: '55%', left: '88%', delay: '2s', duration: '23s', color: 'cyan' },
    { id: 5, code: 'SELECT * FROM Users\n  WHERE Active = 1\n  ORDER BY Name', top: '70%', left: '3%', delay: '8s', duration: '21s', color: 'purple' },
    { id: 6, code: '@Injectable({\n  providedIn: "root"\n})', top: '82%', left: '86%', delay: '5s', duration: '24s', color: 'green' },
    { id: 7, code: 'git push origin\n  feature/new-api', top: '45%', left: '90%', delay: '10s', duration: '19s', color: 'cyan' },
    { id: 8, code: 'await _context\n  .SaveChangesAsync();', top: '25%', left: '0%', delay: '12s', duration: '26s', color: 'purple' },
    { id: 9, code: 'kubectl apply -f\n  deployment.yaml', top: '92%', left: '5%', delay: '4s', duration: '22s', color: 'green' },
    { id: 10, code: 'services.AddScoped\n  <IRepository,\n   Repository>();', top: '60%', left: '0%', delay: '7s', duration: '20s', color: 'cyan' },
  ];

  brackets = [
    { id: 1, char: '{ }', top: '12%', left: '45%', delay: '0s', size: '3rem' },
    { id: 2, char: '< />', top: '30%', left: '75%', delay: '4s', size: '2.5rem' },
    { id: 3, char: '[ ]', top: '50%', left: '15%', delay: '7s', size: '2rem' },
    { id: 4, char: '( )', top: '75%', left: '60%', delay: '2s', size: '2.5rem' },
    { id: 5, char: '=>', top: '20%', left: '55%', delay: '9s', size: '2rem' },
    { id: 6, char: '&&', top: '65%', left: '40%', delay: '5s', size: '1.8rem' },
    { id: 7, char: '||', top: '88%', left: '70%', delay: '11s', size: '2rem' },
    { id: 8, char: '!=', top: '40%', left: '50%', delay: '3s', size: '1.5rem' },
  ];
}
