import ProductValue from '../models/ProductValuesModel'

export default {
    render(productValue: ProductValue) {
        return {
            id: productValue.id,
            description: productValue.description,
            value: productValue.value,
            order: productValue.order,
        }
    },

    renderMany(productValues: ProductValue[]) {
        const productValuesSorted = productValues.sort((a, b) => a.order - b.order);

        return productValuesSorted.map(productValue => this.render(productValue));
    }
}