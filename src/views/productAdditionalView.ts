import ProductAdditionals from '../models/ProductAdditionalsModel'

export default {
    render(productAdditional: ProductAdditionals) {
        return {
            id: productAdditional.id,
            pdv: productAdditional.pdv,
            price: productAdditional.price,
            order: productAdditional.order,
            additional: productAdditional.additional,
            categoryAdditional: productAdditional.categoryAdditional,
        }
    },

    renderMany(productAdditionals: ProductAdditionals[]) {
        return productAdditionals.map(productAdditional => this.render(productAdditional));
    }
}