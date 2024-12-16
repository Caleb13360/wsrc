import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rp-rewards',
  imports: [CommonModule, MatIconModule],
  templateUrl: './rpRewards.component.html',
  styleUrl: './rpRewards.component.css'
})
export class RPRewardsComponent {
  racePointRacers = Array.from({ length: 10 }, (_, i) => ({
    racerPoints: `${25-i}`,
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    lastCompeted: `${i + 1} days ago`,
      prize: `Free Race Entry`
  }));
}
