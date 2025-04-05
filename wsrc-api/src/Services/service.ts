import type { Race } from '@models/race.d.ts';
// import type { User } from '@models/user.d.ts';
import { IRacingService} from './iracing.js';
import { Supabase } from './supaBase.js';
import { RaceResult } from '@models/raceResults.js';
import { SeriesResult } from '@models/seriesResult.js';
import { Video } from '@models/video.js';
// import { Auth } from './auth.js';
const iRacingService: IRacingService = new IRacingService();
// const auth: Auth = new Auth();
const db: Supabase = new Supabase();

export class Service{
    // user: User = {
    //         id: 1,
    //         iracing_username: 'himmy grills',
    //         iracing_id: 1,
    //         joined_date: new Date('2021-01-01'),
    //         email: '',
    //         country: '',
    //         last_competed: new Date('2024-01-01'),
            
    // };
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

    // async loginWithGoogle(credentials: string): Promise<string> {
    //     const { userid: googleId, email } = await auth.verifyIdToken(credentials);
    //     // Create account if none exists
    //     await db.createUser(googleId, email);
    //     const jwtToken: string = auth.generateToken(googleId);
    //     return jwtToken;
    // }

    //  decodeJWT(jwtToken: string): any  {
    //     return auth.decodeToken(jwtToken);
    //         }
    
    // async checkUserLinked(googleId: string): Promise<boolean> {
    //     const exists = await db.userExists(googleId);
    //     if (!exists) {
    //         await db.createUser(googleId, '');
    //     }
    //     const user = await db.getUserById(googleId);
    //     return user.iracing_id !== null;
    // }

    // async linkUser(googleId: string, query_search: string, promotionalEmails: boolean): Promise<void> {
    //     const user = await iRacingService.lookupDriver(query_search);
    //     const userDetails = await iRacingService.memberProfile(user[0].cust_id);
    //     await db.linkUser(googleId, user[0].cust_id, user[0].display_name, userDetails.member_info.club_name, promotionalEmails);
    //     return;
    // }

    async lookupDriver(searchTerm: string): Promise<any> {
        const user = await iRacingService.lookupDriver(searchTerm);
        return user.length > 0 ? user[0] : [];
    }

    // async getCurrentUser(googleId: string): Promise<User> {
    //     return await db.getUserById(googleId);
    // }


    // async getUserById(id: string): Promise<User> {
    //     return this.user;
    // }
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
        return result;
    }
    async getFinishedRacesAfter(startAfterId: number, numberOfResults: number): Promise<Race[]> {
        const result = await db.getFinishedRacesAfter(startAfterId, numberOfResults);
        return [];
    }
    async getRace(id: number): Promise<Race> {
        const result = await db.getRace(id);
        return result as Race;
    }

    async getRaceResults(id: number): Promise<RaceResult[]> {
        const results = await db.getRaceResutls(id);
        return results;
    }
    getAverageLapTime(raceId: string): number{
        //how do we match the last race to get average?
        return 93.791;
    }
    getFastestLapTime(raceId: string): number{
        // how do we match the last race to get fastest
        return 89.520;
    }

    async getTotalPrizeAmount(): Promise<Number>{
        // sum all transactions that are of type prize money
        const results = await db.getTotalPrizeAmount();
        return results;
    }

    async getTotalRaces(): Promise<Number>{
        const totalRaces = await db.getTotalRaces();
        return totalRaces;
    }

    async getDiscordMemberCount(): Promise<Number>{
        const memberCount = db.getDiscordMemberCount();
        return memberCount
    }

    async getRaceVideos(id: number): Promise<Video[]>{
        const videos = await db.getRaceVideos(id);
        return videos;
    }
    async getSeriesResults (series: string): Promise<SeriesResult[]>{
        const results = await db.getSeriesResults(series);
        return results;
    }

    getTransactions(userId: string){
        // get all transactions for a user
        return 'transaction';
    }

    // getNotifications(userId: string){
    //     // get all notifications for a user
    //     return 'notification';
    // }

    // getUserRacerPoints(userId: string){
    //     // sum current racer points across transactions
    //     return 'user points';
    // }
    // getAllRacerPoints(){
    //     return 'all racer points';
    // }

    // getCurrentEvents(){
    //     return 'current events';
    // }

    // getUpcomingEvents(){
    //     return 'upcoming events';
    // }
}
export async function checkRaceResults(){
    const uncheckedRaces = await db.getUnfetchedRaces();
    if (uncheckedRaces.length <= 0) {
        return;
    }
    const raceResults = await iRacingService.getRecentlyHosted();
    if (raceResults.length <= 0) {
        return;
    }
    if(raceResults[0].subsession_id === null){
        return;
    }
    for (const race of uncheckedRaces){
        const raceTime = new Date(race.launch_time);
        for (const result of raceResults){
            const resultTime = new Date(result.start_time);
            resultTime.setTime(resultTime.getTime() + 15 * 60 * 1000);
            const timeDifference = Math.abs(raceTime.getTime() - resultTime.getTime());
            const tenMinutesInMilliseconds = 10 * 60 * 1000;
            if (timeDifference <= tenMinutesInMilliseconds){
                const raceData = await iRacingService.getSessionResults(result.subsession_id);
                const sessionData = raceData.session_results.find((session: any) => session.simsession_type === 6);
                if(sessionData.length > 0){
                    db.updateRaceAfterResult(race, sessionData.results.length);
                }                
                for (const result of sessionData.results){
                    var seriesPoints = 1 + sessionData.results.length - result.finish_position;
                    if(result.best_lap_time === Math.min(...sessionData.results.map((r: any) => r.best_lap_time).filter((time: number) => time > 1))){
                        seriesPoints++;
                    }
                    if(result.incidents === Math.min(...sessionData.results
                        .filter((r: any) => r.average_lap > 1)
                        .map((r: any) => r.incidents))){
                        seriesPoints++;
                    }
                    db.addRaceResult(result.display_name, race.race_id, result.interval, result.finish_position + 1, result.incidents, result.average_lap, result.best_lap_time, seriesPoints);
                }
                break;
            }
        }

    }
}