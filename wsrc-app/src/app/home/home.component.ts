import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import {Race} from '../../../../models/race.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // httpClient:HttpClient  = inject(HttpClient);
  // latestRace: Race | undefined;
  remainingTime: string = '';
  ngOnInit(): void {
    // this.getLatestRace();
  }
  // getLatestRace() {
  //   this.httpClient.get('http://localhost:3000/race/latest').subscribe((data) => {
  //     this.latestRace = data as Race;
  //   });
  // }
}
 