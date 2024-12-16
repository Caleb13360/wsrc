import { SUPABASE_KEY, SUPABASE_URL } from '../config.js';
import { createClient } from '@supabase/supabase-js'

export class Supabase {
    sb;

    constructor() {
        this.sb = createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    async getRaces(startIndex: number, endIndex: number): Promise<any> {
        const data = await this.sb
        .from('Races')
        .select('*')
        .order('launch_time', { ascending: false })
        .range(startIndex, endIndex);
        return data.data;
    }
    async getUpcomingRaces(startIndex: number, endIndex: number): Promise<any> {
        const data = await this.sb
        .from('Races')
        .select('*')
        .gt('launch_time',  new Date().toISOString())
        .order('launch_time', { ascending: false })
        .range(startIndex, endIndex);
        return data.data;
    }

    async getRace(id: string): Promise<any> {
        const data = await this.sb
        .from('Races')
        .select('*')
        .eq('id', id)
        .single();
        return data.data;
    }

}