import Product from '../models/ProductsModel';
import productImageView from './productImageView';
import productValueView from './productValueView';
import productCategorieAdditionalView from './productCategorieAdditionalView';

export default {
    render(product: Product) {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
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
            images: product.images ? productImageView.renderMany(product.images) : [],
            values: product.values ? productValueView.renderMany(product.values) : [],
            categoriesAdditional: product.categoriesAdditional ? productCategorieAdditionalView.renderMany(product.categoriesAdditional) : [],
            availables: product.availables ? product.availables : [],
        }
    },

    renderMany(products: Product[]) {
        const productsSorted = products.sort((a, b) => a.order - b.order);

        return productsSorted.map(product => this.render(product));
    }
}