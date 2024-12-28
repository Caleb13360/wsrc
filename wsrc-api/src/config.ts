import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000;
export const HOSTNAME = process.env.HOSTNAME || 'localhost';

export const IRACING_EMAIL = process.env.IRACING_EMAIL || '';
export const IRACING_PASSWORD = process.env.IRACING_PASSWORD || '';

export const JWT_SECRET = process.env.JWT_SECRET || '';

export const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
export const SUPABASE_URL = process.env.SUPABASE_URL || '';

export const SERVER = {
    HOSTNAME, PORT
}
