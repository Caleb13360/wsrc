import { Race } from '@models/race.js';
import { RaceResult } from '@models/raceResults.js';
import { Video } from '@models/video.js';
// import type { User } from '@models/user.d.ts';
import { SUPABASE_KEY, SUPABASE_URL } from '../config.js';
import { createClient } from '@supabase/supabase-js'
import axios from 'axios';
import { SeriesResult } from '@models/seriesResult.js';

export class Supabase {
    sb;

    constructor() {
        this.sb = createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    // generateUserFromData(data: any): User {
    //     const user: User = {
    //         id: data.id,
    //         iracing_id: data.iracing_id,
    //         iracing_username: data.iracing_username,
    //         email: data.email,
    //         country: data.country,
    //         last_competed: new Date(),
    //         joined_date: data.joined
    //     };
    //     return user;
    // }

    // async createUser(googleId: string, email: string): Promise<void> {
    //     const existingUser = await this.userExists(googleId);
    //     if (!existingUser) {
    //         const { error } = await this.sb
    //             .from('User')
    //             .insert([{ google_id: googleId, email }]);

    //         if (error) {
    //             throw error;
    //         }
    //     }
    //     return;
    // }

    // async linkUser(googleId:string, iracingId: number, name: string, country: string, promotionalEmails: boolean): Promise<void> {
    //     const { error } = await this.sb
    //         .from('User')
    //         .update({ iracing_id: iracingId, iracing_username: name, country: country, email_promotions: promotionalEmails })
    //         .eq('google_id', googleId);
    //     if (error) {
    //         throw error;
    //     }
    // }

    // async getUserById(googleId: string): Promise<User> {
    //     const { data: user, error: selectError } = await this.sb
    //         .from('User')
    //         .select('*')
    //         .eq('google_id', googleId)
    //         .single();

    //     if (selectError && selectError.code !== 'PGRST116') {
    //         throw selectError;
    //     }
    //     return this.generateUserFromData(user);
    // }

    // async userExists(googleId: string): Promise<boolean> {
    //     const { data: existingUser, error: selectError } = await this.sb
    //         .from('User')
    //         .select('*')
    //         .eq('google_id', googleId)
    //         .single();

    //     if (selectError && selectError.code !== 'PGRST116') {
    //         throw selectError;
    //     }
    //     return !!existingUser;
    // }
    async getMatcherinoRaceData(matcherinoId: string): Promise<any> {
        try {
          const response = await axios.get(`https://api.matcherino.com/__api/bounties/findById?id=${matcherinoId}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching Matcherino race data:', error);
          throw error;
        }
      } 
    async generateRaceFromData(data: any){
        var matcherinoData;
        if(data.prize_money==null||data.participants==null){
            matcherinoData = await this.getMatcherinoRaceData(data.matcherino_id);
        }
        const race: Race = {
            race_id: data.race_id,
            race_name: data.race_name,
            max_racers: data.max_racers,
            race_time_of_day: data.race_time_of_day,
            racing_discipline: data.racing_discipline,
            car: data.car,
            launch_time: data.launch_time,
            server_location: data.server_location, 

            //financial
            entry_fee: data.entry_fee,
            entry_cut: data.entry_cut,
            matcherino_id: data.matcherino_id,
            matcherino_image_id: data.matcherino_image_id,
            participants: data.participants?? matcherinoData['body']['playerPoolSize'],
            prize_pool: data.prize_money ?? matcherinoData['body']['balance']/100,
            prize_pool_pot: data.prize_pool_pot,    
            
            //race details
            race_details_id: data.race_details_id,
            race_laps: data.RaceDetails.race_laps,
            race_time: data.RaceDetails.race_time,
            event_type: data.RaceDetails.event_type,
            practice_time: data.RaceDetails.practice_time,
            event_duration: data.RaceDetails.event_duration,
            qualifier_laps: data.RaceDetails.qualifier_laps,
            qualifier_time: data.RaceDetails.qualifier_time,

            //weather
            weather_id: data.weather_id,
            weather_name: data.RaceWeather.name,
            humidity: data.RaceWeather.humidity,
            wind_speed: data.RaceWeather.wind_speed,
            cloud_cover: data.RaceWeather.cloud_cover,
            fog_enabled: data.RaceWeather.fog_enabled,
            temperature: data.RaceWeather.temperature,
            track_moisture: data.RaceWeather.track_moisture,
            wind_direction: data.RaceWeather.wind_direction,

            //track
            track_id: data.track_id, 
            track_name: data._Track.track_name,
            track_config: data._Track.track_config,

            //series
            race_series_id: data.series_id,
            race_series_name: data.Series.name,
            race_irating_min: data.Series.irating_min,
            race_irating_max: data.Series.irating_max
        };
        return race;
    }
    async generateRacesFromData(data: any): Promise<Race[]> {
        if (data.data) {
            const races: Race[] = await Promise.all(data.data.map(async (item: any) => await this.generateRaceFromData(item)));
            return races;
        }
        return [];
    }
    async generateRaceResultFromData(data: any){
        const raceResult: RaceResult = {
            id: data.id,
            iracing_id: data.iracing_id,
            pos: data.position,
            interval: data.interval,
            avg_lap_time: data.average_lap_time,
            best_lap_time: data.fastest_lap_time,
            incident_count: data.incidents,
            race_id: data.race_id,
            prize_money: data.prize,
            series_points: data.series_points
        };
            return raceResult;
    }
    async generateRaceResultsFromData(data: any): Promise<RaceResult[]> {
        if (data) {
            const races: RaceResult[] = await Promise.all(data.map(async (item: any) => await this.generateRaceResultFromData(item)));
            return races;
        }
        return [];
    }
    async getUnfetchedRaces() {
        const raceData = await this.sb
        .from('Races')
        .select(`race_id, launch_time, matcherino_id`)
        .gt('launch_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .lt('launch_time', new Date().toISOString())
        const raceIds = raceData.data ? raceData.data.map(item => item.race_id) : []
        const { data, error } = await this.sb
            .from('RaceResult')
            .select('race_id')
            .in('race_id', raceIds)
        const existingRaceIds = data ? data.map(row => row.race_id) : []
        const missingRaces = raceData.data ? raceData.data.filter(race => !existingRaceIds.includes(race.race_id)) : []
        return missingRaces;
    }

    async getFinishedRaces(startAfter: Date, numberOfResults: number): Promise<any> {
        const data = await this.sb
        .from('Races')
        .select(`
            *,
            RaceWeather(*),
            RaceDetails(*),
            _Track(*),
            Series(*)
        `)
        .lt('launch_time',  startAfter.toISOString())
        .order('launch_time', { ascending: false })
        .range(0, numberOfResults);
        return this.generateRacesFromData(data);
    }
    async getFinishedRacesAfter(startAfterId: number, numberOfResults: number): Promise<any> {
        const data = await this.sb
        .from('Races')
        .select(`
            *,
            RaceWeather(*),
            RaceDetails(*),
            _Track(*),
            Series(*)
        `)
        // .lt('launch_time',  startAfter.toISOString())
        .order('launch_time', { ascending: false })
        .range(0, numberOfResults);
        return this.generateRacesFromData(data);
    }
    async getUpcomingRaces(startAfter: Date, numberOfResults: number): Promise<Race[]> {
        const data = await this.sb
        .from('Races')
        .select(`
            *,
            RaceWeather(*),
            RaceDetails(*),
            _Track(*),
            Series(*)
        `)
        .gt('launch_time',  startAfter.toISOString())
        .order('launch_time', { ascending: true })
        .range(0, numberOfResults);
        return this.generateRacesFromData(data);
    }
    async getUpcomingRacesAfter(startAfterId: number, numberOfResults: number): Promise<Race[]> {
        const data = await this.sb
        .from('Races')
        .select(`
            *,
            RaceWeather(*),
            RaceDetails(*),
            _Track(*),
            Series(*)
        `)
        // .gt('launch_time',  startAfter.toISOString())
        .order('launch_time', { ascending: true })
        .range(0, numberOfResults);
        return this.generateRacesFromData(data);
    }

    async getRace(id: number): Promise<Race | null> {
        const data = await this.sb
            .from('Races')
            .select(`
                *,
                RaceWeather(*),
                RaceDetails(*),
                _Track(*),
                Series(*)
            `)
            .eq('race_id', id)
            .single();
    
        return await this.generateRaceFromData(data.data);
    }

    async getRaceResutls(id: number): Promise<RaceResult[]>{
        const data = await this.sb
            .from('RaceResult')
            .select(`
                *
            `)
            .eq('race_id', id)
            .order('position', { ascending: true });
        return await this.generateRaceResultsFromData(data.data);
    }
    async updateRaceAfterResult(race: {race_id: any;
        launch_time: any;
        matcherino_id: any;}, participants: number): Promise<void> {
        const matcherinoData = await this.getMatcherinoRaceData(race.matcherino_id.toString());
        const { error } = await this.sb
            .from('Races')
            .update({
                participants: participants,
                prize_pool: matcherinoData['body']['balance']/100
            })
            .eq('race_id', race.race_id);
        
        if (error) {
            console.error('Error updating race after result:', error);
            throw error;
        }
        return;
    }
    async addRaceResult(userId: string, raceId: string, interval: number, position: number, incidents: number, avgLapTime: number, FastestLapTime: number, seriesPoints: number): Promise<void> {
        const { error } = await this.sb
                .from('RaceResult')
                .insert([{
                    iracing_id: userId,
                    race_id: raceId,
                    interval: interval,
                    position: position, 
                    incidents: incidents,
                    average_lap_time: avgLapTime,
                    fastest_lap_time: FastestLapTime,
                    season: 1,
                    series_points: seriesPoints
                }]);

            if (error) {
                throw error; 
            }
            return;
    }
    generateVideoFromData(data: any): Video{
        const video: Video = {
            url: data.url,
            race_id: data.race_id,
            replay: data.isReplay,
            short: data.isShort
        }
        return video;
    }

    generateVideosFromData(data: any): Video[]{
        if (data) {
            const videos: Video[] = data.map((item: any) => this.generateVideoFromData(item));
            return videos;
        }
        return [];
    }

    async getRaceVideos(id: number){
        this.getSeriesResults('Rookie');
        const {error, data} = await this.sb.from('Content').select(`
                *
            `).eq('race_id', id);
        return this.generateVideosFromData(data);
    }
    async getSeriesResults(series: string): Promise<SeriesResult[]> {
        // Single query with direct join to Series table
        const { data, error } = await this.sb
            .from('RaceResult')
            .select(`
                iracing_id,
                position,
                prize,
                race_id,
                series_points,
                Races!inner(
                    series_id, 
                    Series!inner(name)
                )
            `).eq('Races.Series.name', series);
    
        if (!data || data.length === 0) {
            return [];
        }
    
        const driverResults: { [key: string]: { name: string, points: number, prize_money: number, races: number } } = {};
    
    
        // Second pass: calculate standings in one go
        for (const result of data) {
            const driverId = result.iracing_id;
            const points = result.series_points;
            const prize = result.prize || 0;
            const races = 1;
    
            if (!driverResults[driverId]) {
                driverResults[driverId] = {
                    name: driverId,
                    points: points,
                    prize_money: prize,
                    races: races
                };
            } else {
                driverResults[driverId].points += points;
                driverResults[driverId].prize_money += prize;
                driverResults[driverId].races+=races;
            }
        }
    
        return Object.values(driverResults).sort((a, b) => b.points - a.points);
    }
    

    async getTotalPrizeAmount(): Promise<Number>{
        const { data, error } = await this.sb
        .from('RaceResult')
        .select('sum:prize.sum()');

    if (error) {
        console.error('Error fetching total prize amount:', error);
        return 0;
    }
    return data[0]?.sum || 0;
    }

    async getTotalRaces(): Promise<Number>{
        const { data, count, error } = await this.sb
            .from('Races')
            .select('*', { count: 'exact', head: true })
            .not('participants', 'is', null);
            if (error || count==null) {
                console.error('Error fetching total prize amount:', error);
                return 0;
            }
            return count;
    }

    async getDiscordMemberCount(): Promise<Number>{
        try {
            const response = await axios.get(`https://discord.com/api/v9/invites/FTgXdAtae8?with_counts=true&with_expiration=true`);
            return response.data['approximate_member_count'];
          } catch (error) {
            console.error('Error fetching discord data:', error);
            return 0;
          }
    }

}