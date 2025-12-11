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
  // Static site - races are managed via Discord
}
