import type { Race } from '@models/race.d.ts';
import type { User } from '@models/user.d.ts';

export function getUserById(id: string): User {
    return user;
}
const user: User = {
    id: 1,
    iracing_username: 'himmy grills',
    joined_date: new Date('2021-01-01'),
    email: '',
    name: '',
    country: '',
    last_competed: new Date('2024-01-01'),
};
//-----------------------------------------------
const race: Race = {
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
        race_length: 300, // in kilometers
        quali_laps: 3,
        max_racers: 20
    }

export function getLatestRace(startIndex: number, endIndex: number): Race[] {
    return [race];
}
export function getRace(id: string): Race {
    return race;
}
export function getAverageLapTime(raceId: string): number{
    return 93.791;
}
export function getFastestLapTime(raceId: string): number{
    return 89.520;
}

export function getTotalPrizeAmount(): number{
    return 102168;
}

export function getTransactions(userId: string){
    return 'transaction';
}

export function getNotifications(userId: string){
    return 'notification';
}

export function getUserRacerPoints(userId: string){
    return 'user points';
}
export function getAllRacerPoints(){
    return 'all racer points';
}