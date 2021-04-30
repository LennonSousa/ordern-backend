import ProductsHighlights from '../models/ProductsHighlightsModel';
import productsCustomersView from '../views/customers/productView';

export default {
    render(productHighlight: ProductsHighlights) {
        return {
            id: productHighlight.id,
            active: productHighlight.active,
            product: productsCustomersView.render(productHighlight.product)
        }
    },

    renderMany(productHighlights: ProductsHighlights[]) {
        return productHighlights.map(productHighlight => this.render(productHighlight));
    }
}