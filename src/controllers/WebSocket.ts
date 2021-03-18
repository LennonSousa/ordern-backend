import { Socket, Server } from 'socket.io';

import OrderWebSocketHandler from './OrderWebSocketHandlers';

export default {
    onConnection(socket: Socket) {
        console.log(`Client connected: ${socket.id}`);

        OrderWebSocketHandler.show(socket);

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
            socket.disconnect();
        });
    }
}