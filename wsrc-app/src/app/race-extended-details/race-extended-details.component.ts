import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Race } from '@models/race';
import { ApiService } from './../../services/api';

@Component({
  selector: 'app-race-extended-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './race-extended-details.component.html',
  styleUrls: ['./race-extended-details.component.css'],
  providers: [ApiService] 
})
export class RaceExtendedDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService

  ) {}
  race!: Race;
  countdown = {
    days: '?',
    hours: '?',
    minutes: '?',
    seconds: '?'
  };
  raceStarted = false;
  intervalId: any;
  ngOnInit(): void {
    this.updateCountdown();
      this.intervalId = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(!id){return;}
      this.apiService.getRace(id).subscribe((data)=> {
        this.race=data.race;
        });
    });
  }

  private updateCountdown(): void {
    if(!this.race){return;}
    const now = new Date().getTime();
    const launchTime = new Date(this.race.launch_time).getTime();
    const distance = launchTime - now;

    if (distance < 0) {
      this.raceStarted = true;
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.countdown = {
      days: days.toString(),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }
  racers = Array.from({ length: 18 }, (_, i) => ({
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    lastCompeted: `${i + 1} days ago`
  }));
}
