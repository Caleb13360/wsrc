import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Race } from '@models/race';
import { ApiService } from './../../services/api';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-race-results',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './race-results.component.html',
  styleUrl: './race-results.component.css',
    providers: [ApiService]
})
export class RaceResultsComponent implements OnInit{
  constructor( private apiService: ApiService) {}
  races!: Race[];
  ngOnInit(): void {
    this.apiService.getFinishedRaces(20).subscribe((data)=> {this.races=data.races;});
  }
}
