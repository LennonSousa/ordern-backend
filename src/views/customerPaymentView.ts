import CustomerPayments from '../models/CustomerPaymentsModel';
import { decrypt } from '../utils/encryptDecrypt';

export default {
    render(customerPayment: CustomerPayments) {
        return {
            id: customerPayment.id,
            card_number: decrypt(customerPayment.card_number),
            brand: customerPayment.brand,
            exp_month: customerPayment.exp_month,
            exp_year: customerPayment.exp_year,
            name: customerPayment.name,
            cpf: customerPayment.cpf,
        }
    },

    renderMany(customerPayments: CustomerPayments[]) {
        const customerPaymentHidden = customerPayments.map(item => {
            return { ...item, card_number: item.card_number.slice(item.card_number.length - 4) }
        })

        return customerPaymentHidden.map(customerPayment => this.render(customerPayment));
    }
}