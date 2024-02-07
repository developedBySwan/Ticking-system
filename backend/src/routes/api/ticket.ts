import express, { Router, Request, Response } from 'express';

const ticketRouter = express.Router();

ticketRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello From Express + Ts (Not Ts Yet!)');
})

ticketRouter.get('/hi', (req: Request, res: Response) => {
    res.send('hi from hi route good');
})

ticketRouter.get('/hello', (req: Request, res: Response) => {
    res.send('hello from hello route');
})

export default ticketRouter;