import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
// import type {User} from '../../../models/user.d.ts';
import type {Race} from '../../../models/race.d.ts';
import type {Video} from '../../../models/video.d.ts';
import type {RaceResult} from '../../../models/raceResults.d.ts';
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

  checkUsername(username: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/login/findIracingUser/${username}`);
  }
  linkUser(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login/link`, data, {withCredentials: true});
  }

  // getCurrentUser() {
  //   return this.httpClient.get<{ user: User }>(`${this.apiUrl}/user/current`, {withCredentials: true});
  // }

  getLatestRace() {
    return this.httpClient.get<{ race: Race }>(`${this.apiUrl}/race/next`);
  }

  getRace(id: string) {
    return this.httpClient.get<{race: Race}>(`${this.apiUrl}/race/${id}`)
  }

  getRaceResults(id: string){
    return this.httpClient.get<{results: RaceResult[]}>(`${this.apiUrl}/race/${id}/results`)
  }

  getLatestRaces(numberOfResults: number) {
    return this.httpClient.get<{races: Race[]}>(`${this.apiUrl}/races/upcoming/${numberOfResults}`)
  }

  getFinishedRaces(numberOfResults: number) {
    return this.httpClient.get<{races: Race[]}>(`${this.apiUrl}/races/finished/${numberOfResults}`)
  }

  getTotalMoney() {
    return this.httpClient.get<{ totalPrizeAmount: number }>(`${this.apiUrl}/stats/total-prize-amount`);
  }

  isLiveStreaming(){
    return this.httpClient.get("https://decapi.me/twitch/uptime/wsrc_official", { responseType: 'text' });
  }

  getRaceVideos(id: string){
    return this.httpClient.get<{videos: Video[]}>(`${this.apiUrl}/race/${id}/videos`)
  }
}
