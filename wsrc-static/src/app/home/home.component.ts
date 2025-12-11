import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  latestRaces: any[] = [];
  totalPrizeAmount: number = 734.94;
  isLive: boolean = false;
  loading: boolean = false;
  totalRaces: number = 26;
  discordMembers: number = 3563;

  ngOnInit(): void {
    // Static site - no API calls needed
  }
}
