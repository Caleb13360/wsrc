import { Router } from 'express';
import { Service } from './Services/service.js';
import { IRacingService} from './Services/iracing.js';
const service: Service = new Service();
const iRacingService: IRacingService = new IRacingService();
//
//#region RACES
const router = Router();
// Get the next race to occur
router.get('/race/next', (_, res) => {
    res.json({ race: service.getLatestRace(0,1)});
});
// Get race by ID
router.get('/race/:ID', (_, res) => {
    res.json({ race: service.getRace('ID')});
});
// Get race lap statistics (average and fastest lap time)
router.get('/race/:ID/lap_stats', (_, res) => {
    const raceId = 'ID';
    res.json({
        average_time: service.getAverageLapTime(raceId),
        fastest_time: service.getFastestLapTime(raceId)
    })
});
router.get('/race/:ID/fastest_lap')
// Get the next x races to start
router.get('/races/upcoming/:Start/:Stop', (_, res) => {
    const startIndex = 0;
    const endIndex = 0;
    res.json({ races: service.getLatestRace(startIndex,endIndex)});
});
//Get the next x races that have finished
router.get('/races/finished/:Start/:Stop', (_, res) => {
    const startIndex = 0;
    const endIndex = 0;
    res.json({ races: service.getLatestRace(startIndex,endIndex)});
});
// Get the total amount of prize money won by users
router.get('/stats/total-prize-amount', (_, res) => {
    res.json({totalPrizeAmount: service.getTotalPrizeAmount()})
});
// Gets user by id
router.get('/user/:ID', (_, res) => {
    const id = 'ID';
    res.json({user: service.getUserById(id)});
});
// Gets transacations for a user
router.get('/user/:ID/transactions', (_, res) => {
    const id = 'ID';
    res.json({transactions: service.getTransactions(id)})
});
// Gets notifications for a user
router.get('/user/:ID/notifications', (_, res) => {
    const id = 'ID';
    res.json({notifcations: service.getNotifications(id)})
});
// Gets the racerpoints leaderboard
router.get('/racerpoints', (_, res) => {
    res.json({racerPointStandings: service.getAllRacerPoints()})
});
// Gets the current events
router.get('/events/current', (_, res) => {
    res.json({events: service.getCurrentEvents()});
});
// Gets upcoming events
router.get('/events/upcoming', (_,res) => {
    res.json({events: service.getUpcomingEvents()});
});

export default router;