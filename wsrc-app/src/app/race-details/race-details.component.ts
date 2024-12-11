import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-race-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css']
})
export class RaceDetailsComponent {
  racers = Array.from({ length: 18 }, (_, i) => ({
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    lastCompeted: `${i + 1} days ago`
  }));
}
