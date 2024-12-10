import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-races',
  imports: [CommonModule, MatIconModule],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css'
})
export class RacesComponent {
  races = [{
    date: '2023-10-01',
    start_time: '10:00 AM',
    car: 'Ferrari',
    track: 'Silverstone',
    prize_pool: '$10,000',
    racers: '18/20'
  }];
}
