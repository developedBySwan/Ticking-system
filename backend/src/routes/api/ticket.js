import express from 'express';

const ticketRouter = express.Router();

ticketRouter.get('/', (req, res) => {
    res.send('Hello From Express + Ts (Not Ts Yet!)');
})

ticketRouter.get('/hi', (req, res) => {
    res.send('hi from hi route good');
})

ticketRouter.get('/hello', (req, res) => {
    res.send('hello from hello route');
})

export default ticketRouter;