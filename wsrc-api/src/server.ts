import http from 'http'
import express from 'express'
import routes from './routes.js'
import cookieParser from 'cookie-parser'
import { checkRaceResults } from './Services/service.js'

const PORT = process.env.PORT || 3000;
export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    const allowedOrigins = ['http://localhost:4200', 'http://localhost:4300', 'http://170.64.251.251:8080'];
    app.use((req, res, next) => {
        const origin: string | undefined = req.headers.origin;
        if (origin && allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Credentials', 'true');
        }
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/', routes);
    httpServer = http.createServer(app);
    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    setInterval(checkRaceResults, 60000);
}

Main();
