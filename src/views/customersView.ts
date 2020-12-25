import Customer from '../models/CustomersModel'

export default {
    render(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            cpf: customer.cpf,
            birth: customer.birth,
            phone: customer.phone,
            email: customer.email,
            active: customer.active,
            paused: customer.paused,
            address: customer.address,
            payment: customer.payments,
        }
    },

    renderMany(customers: Customer[]) {
        return customers.map(customer => this.render(customer));
    }
}