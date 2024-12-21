import type { Race } from '@models/race.d.ts';
import type { User } from '@models/user.d.ts';
import { IRacingService} from './iracing.js';
import { Supabase } from './supaBase.js';
const iRacingService: IRacingService = new IRacingService();
const db: Supabase = new Supabase();

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
    // race: Race = {
    //         id: 1,
    //         racers: ['Racer1', 'Racer2', 'Racer3'],
    //         track: 'Silverstone Circuit',
    //         track_config:'2012 GP',
    //         car: 'Formula 1',
    //         start_time: new Date('2024-12-25T14:00:00Z'),
    //         entry_fee: 100,
    //         name: 'Grand Prix 2024',
    //         // Weather
    //         temperature: 25,
    //         forecast: 'Sunny',
    //         cloud_cover: 10,
    //         rain_chance: 0,
    //         humidity: 50,
    //         wind_speed: 5,
    //         // Details
    //         race_length: 300,
    //         quali_laps: 3,
    //         max_racers: 20,
    //          fixed_setup: true,
    // fastest_lap_last_race:3.01,
    // average_lap_last_race: 3.06,
    // first_pp:100,  // Prize pool amount for first place
    // second_pp:80, // Prize pool amount for second place
    // third_pp: 60, // Prize pool amount for third place
    // }
    async getUserById(id: string): Promise<User> {
        return this.user;
    }
    async getUpcomingRaces(startAfter: Date, numberOfResults: number): Promise<Race[]> {
        const result = await db.getUpcomingRaces(startAfter, numberOfResults);
        return result;
    }
    async getUpcomingRacesAfter(startAfterId: number, numberOfResults: number): Promise<Race[]> {
        const result = await db.getUpcomingRacesAfter(startAfterId, numberOfResults);
        return result;
    }
    async getFinishedRaces(startAfter: Date, numberOfResults: number): Promise<Race[]> {
        const result = await db.getFinishedRaces(startAfter, numberOfResults);
        console.log(result)
        return [];
    }
    async getFinishedRacesAfter(startAfterId: number, numberOfResults: number): Promise<Race[]> {
        const result = await db.getFinishedRacesAfter(startAfterId, numberOfResults);
        return [];
    }
    async getRace(id: number): Promise<Race> {
        const result = await db.getRace(id);
        console.log(result);
        return result as Race;
    }
    getAverageLapTime(raceId: string): number{
        //how do we match the last race to get average?
        return 93.791;
    }
    getFastestLapTime(raceId: string): number{
        // how do we match the last race to get fastest
        return 89.520;
    }

    getTotalPrizeAmount(): number{
        // sum all transactions that are of type prize money
        return 102168;
    }

    getTransactions(userId: string){
        // get all transactions for a user
        return 'transaction';
    }

    getNotifications(userId: string){
        // get all notifications for a user
        return 'notification';
    }

    getUserRacerPoints(userId: string){
        // sum current racer points across transactions
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