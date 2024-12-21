import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications = [{
    date: '24 Dec',
    time: '18:15',
    message: 'Notification messag Notification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messagee'
  },
{
    date: '24 Dec',
    time: '18:15',
    message: 'Notification messag Notification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messagee'
  },
{
    date: '24 Dec',
    time: '18:15',
    message: 'Notification messag Notification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messageNotification messagee'
  }];
}
