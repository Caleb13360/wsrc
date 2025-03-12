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
        console.log(data);
        this.videos=data.videos;
    });
    });
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
