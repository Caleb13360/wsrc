import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-big-blind',
  imports: [CommonModule,MatIconModule, RouterLink],
  templateUrl: './big-blind.component.html',
  styleUrl: './big-blind.component.css'
})
export class BigBlindComponent {
racers = Array.from({ length: 18 }, (_, i) => ({
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    lastCompeted: `${i + 1} days ago`
  }));
}
