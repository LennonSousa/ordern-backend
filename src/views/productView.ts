require('dotenv/config');
import Product from '../models/ProductsModel'

export default {
    render(product: Product) {
        const image = product.image ? `http://${process.env.HOST_API}/uploads/${product.image}` : product.image;
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            image,
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