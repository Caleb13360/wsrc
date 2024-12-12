import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  racePointRacers = Array.from({ length: 10 }, (_, i) => ({
    racerPoints: `${25-i}`,
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    lastCompeted: `${i + 1} days ago`,
      prize: `Free Race Entry`
  }));
}
