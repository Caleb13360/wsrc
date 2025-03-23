import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Race } from '@models/race';
import { ApiService } from './../../services/api';

@Component({
  selector: 'app-races',
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css',
  providers: [ApiService]
})
export class RacesComponent implements OnInit{
   constructor( private apiService: ApiService) {}
   races!: Race[];
  raceStarted = false;
  countdown = {
    days: '?',
    hours: '?',
    minutes: '?',
    seconds: '?'
  };
  intervalId: any;
  loading: boolean = true;

  ngOnInit(): void {
     this.loading = true;
    this.updateCountdown();
      this.intervalId = setInterval(() => {
        this.updateCountdown();
      }, 1000);
      this.apiService.getLatestRaces(20).subscribe((data)=> {this.races=data.races;
         this.loading = false; console.log(data.races)});
  }

  private updateCountdown(): void {
    if(!this.races){return;}
    const now = new Date().getTime();
    const launchTime = new Date(this.races[0].launch_time).getTime();
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

  sumPrize(cash_split: number[]): number {
    let sum = 0;
    for (let i = 0; i < cash_split.length; i++) {
        sum += cash_split[i];
    }
    return sum;
  }

}