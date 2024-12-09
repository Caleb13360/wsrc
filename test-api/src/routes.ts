import { Router } from 'express';
import * as service from './Services/service.ts';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/api/data', service.handleGetData);


router.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data received', data });
});

export default router;