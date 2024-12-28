import { Router } from 'express';
import { Service } from './Services/service.js';
import { IRacingService} from './Services/iracing.js';
const service: Service = new Service();
const router = Router();
//#region LOGIN
router.post('/login/google', async (req, res) => {
    const { credential } = req.body;
    try {
        const result = await service.loginWithGoogle(credential);
        res.cookie('authToken', result, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});
router.get('/login/check', async (req, res) => {
    const authToken = req.cookies.authToken;
    if(authToken===null || authToken===undefined){
        res.json({ loggedIn: false });
        return;
    }
    const decoded = service.decodeJWT(authToken);
    if(decoded===null || decoded.id===undefined){
        res.json({ loggedIn: false });
        return;
    }
    try {
        const linked = await service.checkUserLinked(decoded.id);
        res.json({ loggedIn: true, linked: linked });
        return;
    } catch (err) {
        res.json({ loggedIn: true, linked: false });
        return;
    }
});
//#endregion
//#region RACES
// Get the next race to occur
router.get('/race/next', async (_, res) => {
    try {
        const races = await service.getUpcomingRaces(new Date(), 1);
        if (races.length > 0) {
            res.json({ race: races[0] });
        } else {
            res.status(404).json({ error: 'No upcoming races found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching next race' });
    }
});
// Get race by ID
router.get('/race/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const race = await service.getRace(Number(id));
        if (race!==null) {
            res.json({ race: race});
        } else {
            res.status(404).json({ error: 'Race not found' });
        }
    } catch (err) {
        res.status(500).json({ error: `Error fetching race ${id}`});
    }
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
router.get('/races/upcoming/:numberOfResults', async (req, res) => {
    const { numberOfResults } = req.params;
    try {
        const races = await service.getUpcomingRaces(new Date(), Number(numberOfResults));
        if (races.length > 0) {
            res.json({ races: races});
        } else {
            res.status(404).json({ error: 'No upcoming races found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching upcoming races' });
    }
});
// Get the next x races to start
router.get('/races/upcoming/:numberOfResults/afterId/:id', async (req, res) => {
    const { numberOfResults, id } = req.params;
    try {
        const races = await service.getUpcomingRacesAfter(Number(id), Number(numberOfResults));
        if (races.length > 0) {
            res.json({ races: races});
        } else {
            res.status(404).json({ error: 'No upcoming races found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching upcoming races' });
    }
});
//Get the next x races that have finished
router.get('/races/finished/:numberOfResults', async (req, res) => {
    const { numberOfResults } = req.params;
    try {
        const races = await service.getFinishedRaces(new Date(), Number(numberOfResults));
        if (races.length > 0) {
            res.json({ races: races});
        } else {
            res.status(404).json({ error: 'No finished races found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching finished races' });
    }
});
//Get the next x races that have finished after a certain id
router.get('/races/finished/:numberOfResults/afterId/:id', async (req, res) => {
    const { numberOfResults, id } = req.params;
    try {
        const races = await service.getFinishedRacesAfter(Number(id), Number(numberOfResults));
        if (races.length > 0) {
            res.json({ races: races});
        } else {
            res.status(404).json({ error: 'No finished races found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching finished races' });
    }
});
//#endregion
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