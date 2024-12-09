import dotenv from 'dotenv'

dotenv.config()

export const PRODUCTION = process.env.NODE_ENV === 'production';
export const DEVELOPMENT = process.env.NODE_ENV === 'development';

export const PORT = process.env.PORT || 3000;
export const HOSTNAME = process.env.HOSTNAME || 'localhost';

export const EMAIL = process.env.EMAIL || '';
export const PASSWORD = process.env.PASSWORD || '';

export const SERVER = {
    HOSTNAME, PORT
}
