"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketRouter = express_1.default.Router();
ticketRouter.get('/', (req, res) => {
    res.send('Hello From Express + Ts (Not Ts Yet!)');
});
ticketRouter.get('/hi', (req, res) => {
    res.send('hi from hi route good');
});
ticketRouter.get('/hello', (req, res) => {
    res.send('hello from hello route');
});
exports.default = ticketRouter;
