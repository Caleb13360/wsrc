export interface Race {
    id: number;
    racers: string[];
    track: string;
    track_config: string,
    car: string;
    start_time: Date;
    entry_fee: number;
    name: string;
    // Weather
    temperature: number;
    forecast: string; 
    cloud_cover: number;
    rain_chance: number;
    humidity: number;
    wind_speed: number;
    // Details
    race_length: number;
    quali_laps: number;
    max_racers: number;
    fixed_setup: boolean;
    fastest_lap_last_race:number;
    average_lap_last_race: number;
    first_pp:number;  // Prize pool amount for first place
    second_pp:number; // Prize pool amount for second place
    third_pp: number; // Prize pool amount for third place
}