import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-race-details',
  imports: [CommonModule],
  templateUrl: './race-details.component.html',
  styleUrl: './race-details.component.css'
})
export class RaceDetailsComponent {
  racers = Array.from({ length: 18 }, (_, i) => ({
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    lastCompeted: `${i + 1} days ago`
}));
}
