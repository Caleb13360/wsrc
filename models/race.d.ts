export interface Race {
    id: number;
    racers: string[];
    track: string;
    car: string;
    startTime: Date;
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
}