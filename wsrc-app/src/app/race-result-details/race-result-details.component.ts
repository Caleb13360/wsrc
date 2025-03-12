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
  imports: [CommonModule, RouterLink, MatIconModule],
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
  convertToLapTime(time: number): string {
    if(time <- 0){
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
}
