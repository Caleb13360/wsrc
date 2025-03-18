import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Race } from '@models/race';
import { RaceResult } from '@models/raceResults';
import { Video } from '@models/video';
import { ApiService } from './../../services/api';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-race-results',
  imports: [CommonModule, MatIconModule],
  templateUrl: './race-result-details.component.html',
  styleUrl: './race-result-details.component.css',
    providers: [ApiService]
})
export class RaceResultDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private apiService: ApiService, private sanitizer: DomSanitizer) {}
  race!: Race;
  results!: RaceResult[];
  videos!: Video[];
  winners!: RaceResult[];
  shorts!: Video[];
  replay!:  Video[];
  bestLapTime!: number;
  bestIncidentCount!: number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(!id){return;}
      this.apiService.getRace(id).subscribe((data)=> {
        this.race=data.race;
        });
      this.apiService.getRaceResults(id).subscribe((data)=> {
          this.results=data.results;
          this.winners = this.results.filter((result)=> result.prize_money > 0);
          this.bestLapTime = this.findBestLapTime();
          this.bestIncidentCount = this.findBestIncidentCount();
          console.log(this.bestLapTime);
          console.log(this.bestIncidentCount);
      });
      this.apiService.getRaceVideos(id).subscribe((data)=> {
        this.videos = data.videos.map(video => ({
          ...video,
          url: this.sanitizer.bypassSecurityTrustResourceUrl(video.url)
        }));
        this.shorts = this.videos.filter(video => video.short);
        this.replay = this.videos.filter(video => video.replay);
    });
    });
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  findBestLapTime(): number {
    const validLapTimes = this.results
      .map(result => result.best_lap_time)
      .filter(time => time > 1);
    return validLapTimes.length > 0 ? Math.min(...validLapTimes) : 0;
  }
  findBestIncidentCount(): number {
    const incidentCounts = this.results.filter(result => result.avg_lap_time > 1)
      .map(result => result.incident_count);
      console.log(incidentCounts[0])
    return incidentCounts.length > 0 ? Math.min(...incidentCounts) : 0;
  }
  convertToLapTime(time: number): string {
    if(time <= 0){
      return '-';
    }
    // Divide by 10 to get milliseconds
  const ms = Math.floor(time / 10);
  
  // Calculate components
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  
  // Format with padding
  const formattedMinutes = minutes.toString();
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
  
  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
convertToInterval(time: number): string {
  if(time <= 0){
    return '-';
  }
  // Divide by 10 to get milliseconds
const ms = Math.floor(time / 10);

// Calculate components
const minutes = Math.floor(ms / 60000);
const seconds = (Math.floor((ms % 60000) / 1000)) + minutes * 60;
const milliseconds = ms % 1000;

// Format with padding
const formattedSeconds = seconds.toString().padStart(2, '0');
const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

return `${formattedSeconds}:${formattedMilliseconds}`;
}
convertToIrating(min: number, max: number): string {
  if(min== -1 && max == -1){
    return 'OPEN';
  }
  if(min == -1){
    return `0 - ${max}`;
  }
  if(max == -1){
    return `${min}+`;
  }
  return `${min} - ${max}`;
}
getSeriesColor(series: string) {
  if(series === 'Rookie'){
    return 'bg-green-500';
  }
  if(series === 'Amateur'){
    return 'bg-blue-500';
  }
  return 'bg-purple-500'; 
  }
  getSeriesButton(series: string): string {
    if(series === 'Rookie'){
      return 'bg-green-600 hover:bg-green-500';
    }
    if(series === 'Amateur'){
      return 'bg-blue-600 hover:bg-blue-500';
    }
    return 'bg-purple-600 hover:bg-purple-500';
  }
  getSeriesGradient(series: string): string {
    if(series === 'Rookie'){
      return '#15803d'; // darker green hex color (green-700)
    }
    if(series === 'Amateur'){
      return '#1d4ed8'; // darker blue hex color (blue-700)
    }
    return '#a855f7'; // purple hex color
  }
  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
