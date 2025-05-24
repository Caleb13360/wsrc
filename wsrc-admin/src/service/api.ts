import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import type {Race} from '../../../models/race.d.ts';
import type {RaceResult} from '../../../models/raceResults.d.ts';
import { map, tap } from 'rxjs';
import { race } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class ApiService {
  private apiUrl = environment.apiUrl;

  public races = signal<Race[]>([]);
  public results = signal<RaceResult[]>([]);

  constructor(private httpClient: HttpClient) {
    this.getAllRaces();
    this.getAllResults();
  }
 
  getAllRaces() {
    this.httpClient.get<{ races: Race[] }>(`${this.apiUrl}/admin/race/all`).subscribe({
      
      next: (response) => {
        const _races = response.races.map(race => ({
          ...race,
          launch_time: new Date(race.launch_time)
        }));
        this.races.set(_races);
      }
    });
  }

  getAllResults() {
    this.httpClient.get<{ results: RaceResult[] }>(`${this.apiUrl}/admin/race/results/all`).subscribe({
      next: (response) => {
        this.results.set(response.results);
      }
    });
  }

  createRace(race: Race) {
    this.httpClient.post<Race>(`${this.apiUrl}/admin/race/create`, race).subscribe({
      next: () => {
        this.races.set([...this.races(), race]);
      }
    });
  }

  updateRace(race: Race) {
  return this.httpClient.put(`${this.apiUrl}/admin/race/update/${race.race_id}`, race).pipe(
    tap(() => {
      this.races.set(
        this.races().map(r => r.race_id === race.race_id ? race : r)
      );
    })
  );
}

  deleteRace(raceId: string) {
    this.httpClient.delete(`${this.apiUrl}/admin/race/delete/${raceId}`).subscribe({
      next: () => {
        this.races.set(this.races().filter(r => r.race_id.toString() !== raceId));
      }
    });
  }


}

