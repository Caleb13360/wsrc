import { Request, Response } from 'express';

export function handleGetData(req: Request, res: Response) {
    res.json({ message: 'This is some data' });
}

export function getUser(req: Request, res: Response) {
    res.json({ message: 'This is some data' });
}