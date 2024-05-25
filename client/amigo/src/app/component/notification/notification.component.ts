// notification.component.ts

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];
  private notificationSubscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationSubscription =
      this.notificationService.notifications$.subscribe((notification) => {
        this.notifications.push(notification);
      });
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
