import { Socket } from 'socket.io';
import { Between, getRepository } from 'typeorm';
import { endOfToday, addHours } from 'date-fns';

import { io } from '../server'
import orderView from '../views/orderView';
import OrderModel from '../models/OrdersModel';

export default {
    async index() {
        console.log("Orders reading...");

        ordersRead("read");
    },

    async create() {
        console.log("Orders creating...");

        ordersRead("create");
    },

    async update() {
        console.log("Orders updating...");

        ordersRead("update");
    },

    show(socket: Socket) {
        socket.on("orders:read", () => {
            console.log("Orders reading...");

            ordersRead("read", socket);
        });
    }
}

const ordersRead = async (mode: "read" | "create" | "update", socket?: Socket) => {
    const orderRepository = getRepository(OrderModel);

    const orderStatus = await orderRepository.find({
        where: { ordered: Between(addHours(new Date(), -24), endOfToday()) },
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