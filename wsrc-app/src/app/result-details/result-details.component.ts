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
  results!: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(!id){return;}
      this.apiService.getRace(id).subscribe((data)=> {this.race=data.race;});
      this.apiService.getRaceResults(id).subscribe((data)=> {this.results=data.results; console.log(data.results)})
    });
  }
  formattime(time:number, negative: boolean = false): string{
    if(time === -1){
      return '-1';
    }
    time = Math.floor(time/10);
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    if(negative){
      return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 100 ? '0' : ''}${milliseconds < 10 ? '0' : ''}${milliseconds}`;}
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 100 ? '0' : ''}${milliseconds < 10 ? '0' : ''}${milliseconds}`;
}
}
