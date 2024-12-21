import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-result-details',
  imports: [CommonModule, MatIconModule],
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.css'
})
export class ResultDetailsComponent {
 raceResults = [{
    pos: '1',
    racer: 'Jimmy Grills',
    country: 'Australia',
    interval: '0:00.000',
    avg_lap_time: '3:09:212',
    best_lap: '3:05:212',
    inc: '5',
    money_won: '$500'
  },
{
    pos: '2',
    racer: 'John Carter',
    country: 'Australia',
    interval: '-0:10.101',
    avg_lap_time: '3:09:212',
    best_lap: '3:05:212',
    inc: '5',
    money_won: '$500'
  }];
}
