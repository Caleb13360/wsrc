import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000;
export const HOSTNAME = process.env.HOSTNAME || 'localhost';

export const EMAIL = process.env.IRACING_EMAIL || '';
export const PASSWORD = process.env.IRACING_PASSWORD || '';

export const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
export const SUPABASE_URL = process.env.SUPABASE_URL || '';

export const SERVER = {
    HOSTNAME, PORT
}
