import ProductAdditionals from '../../models/ProductAdditionalsModel';

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
        let productAdditionalsSorted = productAdditionals.filter(item => {return !item.additional.paused});

        productAdditionalsSorted = productAdditionalsSorted.sort((a, b) => a.order - b.order);

        return productAdditionalsSorted.map(productAdditional => this.render(productAdditional));
    }
}