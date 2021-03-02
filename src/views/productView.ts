require('dotenv/config');
import Product from '../models/ProductsModel';
import productValueView from '../views/productValueView';
import productCategorieAdditionalView from '../views/productCategorieAdditionalView';

export default {
    render(product: Product) {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            image: `${process.env.HOST_API}/uploads/${product.image}`,
            maiority: product.maiority,
            code: product.code,
            price_one: product.price_one,
            price: product.price,
            discount: product.discount,
            discount_price: product.discount_price,
            paused: product.paused,
            order: product.order,
            available_all: product.available_all,
            on_request: product.on_request,
            category: product.category,
            values: productValueView.renderMany(product.values),
            categoriesAdditional: productCategorieAdditionalView.renderMany(product.categoriesAdditional),
            availables: product.availables
        }
    },

    renderMany(products: Product[]) {
        return products.map(product => this.render(product));
    }
}