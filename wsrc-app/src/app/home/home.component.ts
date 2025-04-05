import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import type {Race} from '../../../../models/race.d.ts';
import { RouterLink } from '@angular/router';
import { ApiService } from './../../services/api';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  latestRaces!: Race[];
  totalPrizeAmount: number = 0;
  remainingTime: string = '';
  isLive: boolean = false;
  loading: boolean = true;
  totalRaces: Number = 0;
  discordMembers: Number = 0;
  ngOnInit(): void {
    this.loading = true;
    this.apiService.getLatestRaces(2).subscribe(
      (data)=> {
      this.latestRaces=data.races;  
      this.loading = false;  // Set loading to false when data is received
    },
  (error) => {
        console.error('Error fetching races:', error);
        this.latestRaces = [];  // Set to empty array on error
        this.loading = false;   // Set loading to false on error
      }
  );
    this.apiService.getTotalMoney().subscribe((data)=> {this.totalPrizeAmount=data.totalPrizeAmount});
    this.apiService.isLiveStreaming().subscribe((data)=> {this.isLive=!data.includes("offline")});
    this.apiService.getTotalRaces().subscribe((data)=> this.totalRaces=data.totalRaces);
    this.apiService.getTotalDiscordMembers().subscribe((data)=> this.discordMembers=data.discordMemberCount);
  }
}
 