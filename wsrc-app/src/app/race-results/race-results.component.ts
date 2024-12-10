import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-race-results',
  imports: [CommonModule],
  templateUrl: './race-results.component.html',
  styleUrl: './race-results.component.css'
})
export class RaceResultsComponent {
  results = [{
    date: '2023-10-01',
    start_time: '10:00 AM',
    car: 'Ferrari',
    track: 'Silverstone',
    prize_pool: '$10,000',
    racers: '18/20'
  }];
}
