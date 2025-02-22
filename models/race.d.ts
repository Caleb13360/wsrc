export interface Race {
    //race
    race_id: number;
    race_name: string;
    max_racers: number;
    race_time_of_day: string;
    racing_discipline: string;
    car: string;
    launch_time: Date;
    server_location: string;
    entry_fee: number;
    matcherino_id: number;
    matcherino_image_id: string;
    
    //race details
    race_details_id: number;
    race_laps: number;
    race_time: number;
    event_type: string;
    practice_time: number;
    event_duration: number;
    qualifier_laps: number;
    qualifier_time: number;

    //weather
    weather_id: number;
    weather_name: string;
    humidity: number;
    wind_speed: number;
    cloud_cover: string;
    fog_enabled: boolean;
    temperature: number;
    track_moisture: string;
    wind_direction: string;

    //track
    track_id: number;
    track_name: string;
    track_config: string;

    // //prize pool
    // prize_pool_id: number;
    // cash_split: number[];
    // racer_points: number[];
}