import Customer from '../models/CustomersModel';

import customerPaymentView from '../views/customerPaymentView';

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
            created_at: customer.created_at,
            payment: customer.payments ? customerPaymentView.renderMany(customer.payments) : [],
            address: customer.address,
        }
    },

    renderMany(customers: Customer[]) {
        return customers.map(customer => this.render(customer));
    }
}