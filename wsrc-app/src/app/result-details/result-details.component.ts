import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Race } from '@models/race';
import { ApiService } from './../../services/api';
import { interval } from 'rxjs';

@Component({
  selector: 'app-result-details',
  imports: [CommonModule, MatIconModule],
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.css',
    providers: [ApiService]
})
export class ResultDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  race!: Race;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(!id){return;}
      this.apiService.getRace(id).subscribe((data)=> {this.race=data.race;});
    });
  }
  racers = Array.from({ length: 18 }, (_, i) => ({
    name: `Racer ${i + 1}`,
    country: `Country ${i + 1}`,
    money_won: `$${200-(i*10)}`,
    inc: `${i*2719238%3}`,
    interval: '0:00.000',
    best_lap: '0:00.000',
    avg_lap_time: '0:00.000',
  }));
}
