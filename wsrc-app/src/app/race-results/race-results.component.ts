import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Race } from '@models/race';
import { ApiService } from './../../services/api';

@Component({
  selector: 'app-race-results',
  imports: [CommonModule, RouterLink],
  templateUrl: './race-results.component.html',
  styleUrl: './race-results.component.css',
    providers: [ApiService]
})
export class RaceResultsComponent implements OnInit{
  constructor( private apiService: ApiService) {}
  races!: Race[];
  ngOnInit(): void {
    this.apiService.getFinishedRaces(3).subscribe((data)=> {this.races=data.races});
  }
}
