import Product from '../../models/ProductsModel';
import productImageView from '../productImageView';
import productValueView from '../productValueView';
import productCategorieAdditionalView from './productCategorieAdditionalView';
import AvailableProducts from '../../controllers/AvailableProduct';

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
            order: product.order,
            on_request: product.on_request,
            category: product.category,
            images: product.images ? productImageView.renderMany(product.images) : [],
            values: productValueView.renderMany(product.values),
            categoriesAdditional: productCategorieAdditionalView.renderMany(product.categoriesAdditional),
        }
    },

    renderMany(products: Product[]) {
        console.log('productView started...');
        let updatedProducts = AvailableProducts.verifyProducstAvailable(products);

        updatedProducts = updatedProducts.sort((a, b) => a.order - b.order);

        console.log('productView finished...');
        return updatedProducts.map(product => this.render(product));
    }
}