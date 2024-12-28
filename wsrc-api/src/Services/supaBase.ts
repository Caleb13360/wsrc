import { Race } from '@models/race.js';
import { SUPABASE_KEY, SUPABASE_URL } from '../config.js';
import { createClient } from '@supabase/supabase-js'

export class Supabase {
    sb;

    constructor() {
        this.sb = createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    async createUser(googleId: string, email: string): Promise<void> {
        const existingUser = await this.userExists(googleId);
        if (!existingUser) {
            const { error } = await this.sb
                .from('User')
                .insert([{ google_id: googleId, email }]);

            if (error) {
                throw error;
            }
        }
        return;
    }

    async linkUser(googleId:string, iracingId: number, name: string, promotionalEmails: boolean): Promise<void> {
        const { error } = await this.sb
            .from('User')
            .update({ iracing_id: iracingId, iracing_username: name, email_promotions: promotionalEmails })
            .eq('google_id', googleId);
        if (error) {
            throw error;
        }
    }

    async getUserById(googleId: string): Promise<any> {
        const { data: user, error: selectError } = await this.sb
            .from('User')
            .select('*')
            .eq('google_id', googleId)
            .single();

        if (selectError && selectError.code !== 'PGRST116') {
            throw selectError;
        }
        return user;
    }

    async userExists(googleId: string): Promise<boolean> {
        const { data: existingUser, error: selectError } = await this.sb
            .from('User')
            .select('*')
            .eq('google_id', googleId)
            .single();

        if (selectError && selectError.code !== 'PGRST116') {
            throw selectError;
        }
        return !!existingUser;
    }
    generateRaceFromData(data: any){
        const race: Race = {
            race_id: data.race_id,
            race_name: data.race_name,
            max_racers: data.max_racers,
            race_time_of_day: data.race_time_of_day,
            racing_discipline: data.racing_discipline,
            car: data.car,
            launch_time: data.launch_time,
            server_location: data.server_location, 
            entry_fee: data.entry_fee,
            
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

            //prize pool
            prize_pool_id: data.prize_pool_id,
            cash_split: data.PrizePool.cash_split,
            racer_points: data.PrizePool.racer_points
        };
        return race;
    }
    generateRacesFromData(data: any){
        if (data.data) {
            const races: Race[] = data.data.map(this.generateRaceFromData);
            return races;
        }
        return [];
    }
    async getFinishedRaces(startAfter: Date, numberOfResults: number): Promise<any> {
        const data = await this.sb
        .from('Races')
        .select(`
            *,
            RaceWeather(*),
            RaceDetails(*),
            _Track(*),
            PrizePool(*)
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
            PrizePool(*)
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
            PrizePool(*)
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
            PrizePool(*)
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
                PrizePool(*)
            `)
            .eq('race_id', id)
            .single();
    
        return this.generateRaceFromData(data.data);
    }

    // async getTotalPrizeAmount(): Promise<Number | null>{
    //     const data = await this.sb
    //     .from('Transactions')
    //     // sum all transacations of type prize money
    // }

    // async getTransactions

}