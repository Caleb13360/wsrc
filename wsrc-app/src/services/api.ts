import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import type {Race} from '../../../models/race.d.ts';

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getLatestRace() {
    return this.httpClient.get<{race: Race}>('http://localhost:3000/race/next')
  }

  getRace(id: string) {
    return this.httpClient.get<{race: Race}>(`http://localhost:3000/race/${id}`)
  }

  getLatestRaces(numberOfResults: number) {
    return this.httpClient.get<{races: Race[]}>(`http://localhost:3000/races/upcoming/${numberOfResults}`)
  }

  getTotalMoney() {
    return this.httpClient.get<{ totalPrizeAmount: number }>('http://localhost:3000/stats/total-prize-amount')
  } 
}
