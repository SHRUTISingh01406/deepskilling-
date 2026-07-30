import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private instanceId = Math.floor(Math.random() * 10000);

  getNotificationMessage(): string {
    return `[Scoped Instance #${this.instanceId}] System Notification: All portal services are operational.`;
  }
}
