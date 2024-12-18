import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';

import type {Race} from '../../../models/race.d.ts';

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getLatestRace() {
    return this.httpClient.get<{ race: Race }>(`${this.apiUrl}/race/next`);
  }

  getRace(id: string) {
    return this.httpClient.get<{race: Race}>(`http://localhost:3000/race/${id}`)
  }

  getLatestRaces(numberOfResults: number) {
    return this.httpClient.get<{races: Race[]}>(`http://localhost:3000/races/upcoming/${numberOfResults}`)
  }

  getTotalMoney() {
    return this.httpClient.get<{ totalPrizeAmount: number }>(`${this.apiUrl}/stats/total-prize-amount`);
  }
}
