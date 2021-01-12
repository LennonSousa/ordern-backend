require('dotenv/config');
import Product from '../models/ProductsModel'

export default {
    render(product: Product) {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            image: product.image,
            maiority: product.maiority,
            code: product.code,
            price_one: product.price_one,
            price: product.price,
            discount: product.discount,
            discount_price: product.discount_price,
            paused: product.paused,
            order: product.order,
            available_all: product.available_all,
            category: product.category,
            values: product.values,
            categoriesAdditional: product.categoriesAdditional,
            availables: product.availables
        }
    },

    renderMany(products: Product[]) {
        return products.map(product => this.render(product));
    }
}