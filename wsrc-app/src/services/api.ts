import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';

import type {Race} from '../../../models/race.d.ts';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  loggedIn(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/login/check`, {withCredentials: true});
  }
  loginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiUrl}/login/google`, {credential: credentials}, {headers: header, withCredentials: true});
  }

  getLatestRace() {
    return this.httpClient.get<{ race: Race }>(`${this.apiUrl}/race/next`);
  }

  getRace(id: string) {
    return this.httpClient.get<{race: Race}>(`${this.apiUrl}/race/${id}`)
  }

  getLatestRaces(numberOfResults: number) {
    return this.httpClient.get<{races: Race[]}>(`${this.apiUrl}/races/upcoming/${numberOfResults}`)
  }

  getTotalMoney() {
    return this.httpClient.get<{ totalPrizeAmount: number }>(`${this.apiUrl}/stats/total-prize-amount`);
  }
}
