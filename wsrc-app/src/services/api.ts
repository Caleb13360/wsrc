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

  getTotalMoney() {
    return this.httpClient.get<{ totalPrizeAmount: number }>('http://localhost:3000/stats/total-prize-amount')
  } 
}
