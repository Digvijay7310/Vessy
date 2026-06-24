import dotenv from 'dotenv'
dotenv.config()

import http from 'http';
import {Server} from 'socket.io'

import { app } from './app.js'
import connectDB from './config/db.js'
import { setIo } from './utils/socket.js';

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
});

setIo(io);

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", socket.id);
        
    });

});

connectDB()
.then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    });
})
.catch((err) => {
    console.log("MongoDB connection failed", err)
})