import Client from '../models/ClientsModel'

export default {
    render(client: Client) {
        return {
            id: client.id,
            name: client.name,
            cpf: client.cpf,
            birth: client.birth,
            phone: client.phone,
            email: client.email,
            active: client.active,
            paused: client.paused,
            address: client.address,
            payment: client.payments,
        }
    },

    renderMany(clients: Client[]) {
        return clients.map(client => this.render(client));
    }
}