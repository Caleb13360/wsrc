import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import type { Race } from '@models/race.d.ts';

@Component({
  selector: 'app-race-tile',
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './race-tile.component.html',
  styleUrl: './race-tile.component.css'
})
export class RaceTileComponent {
  @Input() race!: Race;
  countdown: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.updateCountdown();
      this.intervalId = setInterval(() => {
        this.updateCountdown();
      }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

    private updateCountdown(): void {
      if(!this.race){return;}
      const now = new Date().getTime();
      const launchTime = new Date(this.race.launch_time).getTime();
      const distance = launchTime - now;
  
      if (distance < 0) {
        this.countdown = 'Race has started';
        clearInterval(this.intervalId);
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      this.countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until race`;
    }
}
