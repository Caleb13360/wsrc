import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient} from '@angular/common/http';
import type {Race} from '../../../../models/race.d.ts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  latestRace: Race | undefined;
  totalPrizeAmount: number = 0;
  remainingTime: string = '';
  ngOnInit(): void {
    this.getLatestRace();
    this.getTotalMoney();
  }
  getLatestRace() {
    this.httpClient.get('http://localhost:3000/race/latest').subscribe((data) => {
      this.latestRace = data as Race;
    });
  }

  getTotalMoney() {
    this.httpClient.get<{ totalPrizeAmount: number }>('http://localhost:3000/stats/total-prize-amount').subscribe((data) => {
      this.totalPrizeAmount = data.totalPrizeAmount;
    });
  }
}
 