import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Race } from '@models/race';
import { SeriesResult } from '@models/seriesResult';
import { RaceResult } from '@models/raceResults';
import { Video } from '@models/video';
import { ApiService } from './../../services/api';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-race-results',
  imports: [CommonModule, MatIconModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
    providers: [ApiService]
})
export class LeaderboardComponent implements OnInit{
  constructor(private route: ActivatedRoute, private apiService: ApiService, private sanitizer: DomSanitizer) {}
  SeriesResults: SeriesResult[] = [];
  selectedSeries: number = 0;
  ngOnInit(): void {
    this.apiService.getSeriesResults('all').subscribe((data)=> {
      this.SeriesResults=data.results;
    });
    // this.apiService.getSeriesResults('Challenger').subscribe((data)=> {
    //   this.SeriesResults[2]=data.results;
    // });
  }
  selectSeries(series: number){
    this.selectedSeries = series;
  }
}