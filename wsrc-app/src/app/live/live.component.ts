import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Race } from '@models/race';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-live',
  imports: [CommonModule, RouterLink],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  isLive: boolean = false;
  countdown = {
    days: '?',
    hours: '?',
    minutes: '?',
    seconds: '?'
  };
  race!: Race;
  intervalId: any;
  ngOnInit(): void {
    this.apiService.isLiveStreaming().subscribe((data)=> {this.isLive=!data.includes("offline")});
    this.apiService.getLatestRaces(1).subscribe((data)=> {this.race=data.races[0]});
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
  private updateCountdown(): void {
      if(!this.race){return;}
      const now = new Date().getTime();
      const launchTime = new Date(this.race.launch_time).getTime();
      const distance = launchTime - now;
  
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
}
