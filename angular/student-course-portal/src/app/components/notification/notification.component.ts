import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

// Component-level providers create a new service instance for that component and its children — useful when you need isolated state per component instance, such as a form wizard with multiple steps.
@Component({
  selector: 'app-notification',
  standalone: true,
  providers: [NotificationService],
  template: `
    <div class="notification-box">
      <p>🔔 {{ message }}</p>
    </div>
  `,
  styles: [`
    .notification-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #1e40af;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      margin: 1rem 0;
    }
    p { margin: 0; font-size: 0.9rem; font-weight: 500; }
  `]
})
export class NotificationComponent {
  message: string;

  constructor(private notificationService: NotificationService) {
    this.message = this.notificationService.getNotificationMessage();
  }
}
