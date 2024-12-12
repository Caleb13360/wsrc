import type { Race } from '@models/race.d.ts';
import type { User } from '@models/user.d.ts';
import { IRacingService} from './iracing.js';
const iRacingService: IRacingService = new IRacingService();

export class Service{
    user: User = {
            id: 1,
            iracing_username: 'himmy grills',
            joined_date: new Date('2021-01-01'),
            email: '',
            name: '',
            country: '',
            last_competed: new Date('2024-01-01'),
    };
    race: Race = {
            id: 1,
            racers: ['Racer1', 'Racer2', 'Racer3'],
            track: 'Silverstone Circuit',
            car: 'Formula 1',
            startTime: new Date('2024-12-25T14:00:00Z'),
            entry_fee: 100,
            name: 'Grand Prix 2024',
            // Weather
            temperature: 25,
            forecast: 'Sunny',
            cloud_cover: 10,
            rain_chance: 0,
            humidity: 50,
            wind_speed: 5,
            // Details
            race_length: 300,
            quali_laps: 3,
            max_racers: 20
    }
    getUserById(id: string): User {
        return this.user;
    }
    getLatestRace(startIndex: number, endIndex: number): Race[] {
        return [this.race];
    }
    getRace(id: string): Race {
        return this.race;
    }
    getAverageLapTime(raceId: string): number{
        return 93.791;
    }
    getFastestLapTime(raceId: string): number{
        return 89.520;
    }

    getTotalPrizeAmount(): number{
        return 102168;
    }

    getTransactions(userId: string){
        return 'transaction';
    }

    getNotifications(userId: string){
        return 'notification';
    }

    getUserRacerPoints(userId: string){
        return 'user points';
    }
    getAllRacerPoints(){
        return 'all racer points';
    }

    getCurrentEvents(){
        return 'current events';
    }

    getUpcomingEvents(){
        return 'upcoming events';
    }
}