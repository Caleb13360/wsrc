import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-races',
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css'
})
export class RacesComponent {
  races = [
    {
      date: '2024-10-01',
      start_time: '10:00 AM',
      car: 'Ferrari SF90',
      track: 'Silverstone',
      prize_pool: '$10,000',
      racers: '18/20'
    },
    {
      date: '2024-10-05',
      start_time: '2:00 PM',
      car: 'Toyota GR86',
      track: 'Spa-Francorchamps',
      prize_pool: '$5,000',
      racers: '15/20'
    },
    {
      date: '2024-10-10',
      start_time: '6:30 PM',
      car: 'Porsche 911 GT3',
      track: 'Nürburgring',
      prize_pool: '$7,500',
      racers: '20/20'
    }
  ];
}