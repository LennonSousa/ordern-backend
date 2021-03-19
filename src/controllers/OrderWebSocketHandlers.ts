import { Socket } from 'socket.io';
import { Between, getRepository } from 'typeorm';
import { endOfDay, addHours } from 'date-fns';

import { io } from '../server'
import orderView from '../views/orderView';
import OrderModel from '../models/OrdersModel';

export default {
    async index() {
        console.log("Orders reading...");

        ordersRead("read", addHours(new Date(), -24), endOfDay(new Date()));
    },

    async create() {
        console.log("Orders creating...");

        ordersRead("create", addHours(new Date(), -24), endOfDay(new Date()));
    },

    async update() {
        console.log("Orders updating...");

        ordersRead("update", addHours(new Date(), -24), endOfDay(new Date()));
    },

    show(socket: Socket) {
        socket.on("orders:read", (start: Date, end: Date) => {
            console.log("Orders reading...");

            ordersRead("read", start, end, socket);
        });
    }
}

const ordersRead = async (mode: "read" | "create" | "update", start: Date, end: Date, socket?: Socket) => {
    const orderRepository = getRepository(OrderModel);

    const orderStatus = await orderRepository.find({
        where: { ordered: Between(start, end) },
        order: {
            ordered: "DESC"
        },
        relations: [
            'orderStatus',
            'orderItems',
            'orderItems.orderItemAdditionals'
        ]
    });

    if (mode === "read" && socket)
        socket.emit("orders:read", orderView.renderMany(orderStatus));
    else if (mode === "create")
        io.emit("orders:create", orderView.renderMany(orderStatus));
    else if (mode === "update")
        io.emit("orders:update", orderView.renderMany(orderStatus));
}