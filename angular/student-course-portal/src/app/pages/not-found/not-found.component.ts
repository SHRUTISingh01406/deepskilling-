import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <a routerLink="/" class="btn-home">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 4rem 1rem;
    }
    h1 { font-size: 5rem; color: #ef4444; margin: 0; }
    h2 { font-size: 2rem; color: #0f172a; margin: 0.5rem 0 1rem 0; }
    p { color: #64748b; font-size: 1.1rem; margin-bottom: 2rem; }
    .btn-home {
      background: #2563eb;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class NotFoundComponent {}
