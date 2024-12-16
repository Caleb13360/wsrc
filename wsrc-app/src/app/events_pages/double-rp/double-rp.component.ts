import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-double-rp',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './double-rp.component.html',
  styleUrl: './double-rp.component.css'
})
export class DoubleRPComponent {
  races = [{
    date: '2023-10-01',
    start_time: '10:00 AM',
    car: 'Ferrari',
    track: 'Silverstone',
    prize_pool: '$10,000',
    racers: '18/20'
  }];
}
