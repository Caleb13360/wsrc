import { Router } from 'express';
import * as service from './Services/service.js';
import * as iracing from './Services/iracing.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/api/data', service.handleGetData);
router.get('/api/data1', iracing.handleGetData);


router.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', data });
});

export default router;