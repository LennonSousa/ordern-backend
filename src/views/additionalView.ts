import Additional from '../models/AdditionalsModel'

export default {
    render(additional: Additional) {
        return {
            id: additional.id,
            title: additional.title,
            code: additional.code,
            paused: additional.paused,
            productAdditionals: additional.productAdditionals
        }
    },

    renderMany(additionals: Additional[]) {
        return additionals.map(additional => this.render(additional));
    }
}