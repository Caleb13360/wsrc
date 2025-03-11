import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Race } from '@models/race';
import { RaceResult } from '@models/raceResults';
import { ApiService } from './../../services/api';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-race-results',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './race-result-details.component.html',
  styleUrl: './race-result-details.component.css',
    providers: [ApiService]
})
export class RaceResultDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  race!: Race;
  results!: RaceResult[];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(!id){return;}
      this.apiService.getRace(id).subscribe((data)=> {
        this.race=data.race;
        });
      this.apiService.getRaceResults(id).subscribe((data)=> {
          this.results=data.results;
      });
    });
  }
}
