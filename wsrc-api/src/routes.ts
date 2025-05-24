import { Router } from 'express';
import { Service } from './Services/service.js';
import { IRacingService} from './Services/iracing.js';
const service: Service = new Service();
const router = Router();
//#region LOGIN
// router.post('/login/google', async (req, res) => {
//     const { credential } = req.body;
//     try {
//         const result = await service.loginWithGoogle(credential);
//         res.cookie('authToken', result, {
//             httpOnly: true,
//             secure: true,
//             expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
//         });
//         res.json({ success: true });
//     } catch (err) {
//         res.status(500).json({ error: 'Error logging in' });
//     }
// });
// router.get('/login/check', async (req, res) => {
//     const authToken = req.cookies.authToken;
//     if(authToken===null || authToken===undefined){
//         res.json({ loggedIn: false });
//         return;
//     }
//     const decoded = service.decodeJWT(authToken);
//     if(decoded===null || decoded.id===undefined){
//         res.json({ loggedIn: false });
//         return;
//     }
//     try {
//         const linked = await service.checkUserLinked(decoded.id);
//         res.json({ loggedIn: true, linked: linked });
//         return;
//     } catch (err) {
//         res.json({ loggedIn: true, linked: false });
//         return;
//     }
// });
// router.get('/login/findIracingUser/:search', async (req, res) => {
//     const search = req.params.search;
//     try {
//         const user = await service.lookupDriver(search);
//         res.json({ name: user.display_name, id: user.cust_id });
//     } catch (err) {
//         res.status(500).json({ error: `Error finding driver: ${err}` });
//     }
// });

// router.post('/login/link', async (req, res) => {
//     const { accountName, promotionalEmails } = req.body;
//     const authToken = req.cookies.authToken;
//     if(authToken===null || authToken===undefined){
//         res.json({ loggedIn: false });
//         return;
//     }
//     const decoded = service.decodeJWT(authToken);
//     if(decoded===null || decoded.id===undefined){
//         res.json({ loggedIn: false });
//         return;
//     }
//     try {
//         await service.linkUser(decoded.id, accountName, promotionalEmails);
//         res.json({ success: true });
//     } catch (err) {
//         res.status(500).json({ error: 'Error linking user' });
//     }
// });
// router.get('/user/current', async (req, res) => {
//     const authToken = req.cookies.authToken;
//     if(authToken===null || authToken===undefined){
//         res.json({ loggedIn: false });
//         return;
//     }
//     const decoded = service.decodeJWT(authToken);
//     if(decoded===null || decoded.id===undefined){
//         res.json({ loggedIn: false });
//         return;
//     }
//     try {
//         const user = await service.getCurrentUser(decoded.id);
//         res.json({ user: user });
//         return;
//     } catch (err) {
//         return;
//     }
// });
//#endregion
//#region RACES
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
router.get('/race/:id/results', async (req, res) => {
    const { id } = req.params;
    try {
        const results = await service.getRaceResults(Number(id));
        if (results!==null) {
            res.json({ results: results});
        } else {
            res.status(404).json({ error: 'Race Results not found' });
        }
    } catch (err) {
        res.status(500).json({ error: `Error fetching race ${id} results`});
    }
});
router.get('/race/:ID/lap_stats', (_, res) => {
    const raceId = 'ID';
    res.json({
        average_time: service.getAverageLapTime(raceId),
        fastest_time: service.getFastestLapTime(raceId)
    })
});
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
router.get('/stats/total-prize-amount', async (_, res) => {
    try {
        const totalPrizeAmount = await service.getTotalPrizeAmount();
            res.json({totalPrizeAmount: totalPrizeAmount})
    } catch (err) {
        res.status(500).json({ error: 'Error fetching next race' });
    }
});
router.get('/race/:id/videos', async (req, res) => {
    const { id } = req.params;
    try{
        const videos = await service.getRaceVideos(Number(id));
        if(videos.length > 0){
            res.json({videos: videos});
        }else{
            res.status(404).json({error: 'No videos found'});
        }
    } catch (err){
        res.status(500).json({error: 'Error fetching race videos'}); 
    }
})
router.get('/series/:series/results', async (req, res) => {
    const { series } = req.params;
    try{
        const results = await service.getSeriesResults(series);
        if(results.length > 0){
            res.json({results: results});
        }else{
            res.status(404).json({error: 'No series results found'});
        }
    } catch (err){
        res.status(500).json({error: 'Error fetching series results'});
    }
})
router.get('/totalRaces', async (req, res) => {
    try{
        const totalRaces = await service.getTotalRaces();
        if(totalRaces!=0){
            res.json({totalRaces: totalRaces});
        }else{
            res.status(404).json({error: 'Total number of races not found'});
        }
    } catch (err){
        res.status(500).json({error: 'Error fetching total number of races'});
    }
})

router.get('/discordMemberCount', async (req, res) => {
    try {
        const memberCount = await service.getDiscordMemberCount();
        if(memberCount!=0){
            res.json({discordMemberCount: memberCount});
        }else{
            res.status(404).json({error: 'Discord member count not found'});
        }
    } catch(err){
        res.status(500).json({error: 'Error discord member count'});
    }
})

// Gets user by id
// router.get('/user/:ID', (_, res) => {
//     const id = 'ID';
//     res.json({user: service.getUserById(id)});
// });
// Gets transacations for a user
// router.get('/user/:ID/transactions', (_, res) => {
//     const id = 'ID';
//     res.json({transactions: service.getTransactions(id)})
// });
// // Gets notifications for a user
// router.get('/user/:ID/notifications', (_, res) => {
//     const id = 'ID';
//     res.json({notifcations: service.getNotifications(id)})
// });
// // Gets the racerpoints leaderboard
// router.get('/racerpoints', (_, res) => {
//     res.json({racerPointStandings: service.getAllRacerPoints()})
// });
// // Gets the current events
// router.get('/events/current', (_, res) => {
//     res.json({events: service.getCurrentEvents()});
// });
// // Gets upcoming events
// router.get('/events/upcoming', (_,res) => {
//     res.json({events: service.getUpcomingEvents()});
// });

///ADMIN ROUTES
router.get('/admin/race/all', async (req, res) => {
    try {
        const races = await service.getAllRaces();
        res.json({ races });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching all races' });
    }
});
router.get('/admin/race/results/all', async (req, res) => {
    try {
        const results = await service.getAllResults();
        res.json({ results });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching all results' });
    }
});
router.post('/admin/race/create', async (req, res) => {
    try {
        const race = await service.createRace(req.body);
        res.status(201).json(race);
    } catch (err) {
        res.status(500).json({ error: 'Error creating race' });
    }
});
router.put('/admin/race/update/:id', async (req, res) => {
    try {
        await service.updateRace(req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error updating race' });
    }
});
router.delete('/admin/race/delete/:id', async (req, res) => {
    try {
        await service.deleteRace(Number(req.params.id));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting race' });
    }
});
export default router;