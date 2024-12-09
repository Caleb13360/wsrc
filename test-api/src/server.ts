import http from 'http'
import express from 'express'
import routes from './routes.js'

const PORT = process.env.PORT || 3000;
export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/', routes);
    httpServer = http.createServer(app);
    httpServer.listen(PORT, () => {});
}

Main();