import PaymentStripe from '../models/PaymentStripeModel'

export default {
    renderPublic(paymentStripe: PaymentStripe) {
        return {
            id: paymentStripe.id,
            pk_live: paymentStripe.pk_live,
            active: paymentStripe.active
        }
    },

    renderSecret(paymentStripe: PaymentStripe) {
        return {
            id: paymentStripe.id,
            pk_live: paymentStripe.pk_live,
            sk_live: paymentStripe.sk_live,
            active: paymentStripe.active
        }
    }
}