import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type {Race} from '../../../../models/race.d.ts';
import { RouterLink } from '@angular/router';
import { RaceTileComponent } from "../Components/race-tile/race-tile.component";
import { ApiService } from './../../services/api';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink, RaceTileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  latestRace!: Race;
  totalPrizeAmount: number = 0;
  remainingTime: string = '';
  ngOnInit(): void {
    this.apiService.getLatestRace().subscribe((data)=> {this.latestRace=data.race});
    this.apiService.getTotalMoney().subscribe((data)=> {this.totalPrizeAmount=data.totalPrizeAmount});
  }
}
 