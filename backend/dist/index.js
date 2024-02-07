"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ticket_js_1 = __importDefault(require("./routes/api/ticket.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use('/ticket', ticket_js_1.default);
app.listen(port, () => {
    console.log(`now listen on port =>${port}..................`);
});
