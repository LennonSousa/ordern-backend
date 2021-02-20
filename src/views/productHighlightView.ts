import ProductsHighlights from '../models/ProductsHighlightsModel'

export default {
    render(productHighlight: ProductsHighlights) {
        return {
            id: productHighlight.id,
            active: productHighlight.active,
            product: productHighlight.product
        }
    },

    renderMany(productHighlights: ProductsHighlights[]) {
        return productHighlights.map(productHighlight => this.render(productHighlight));
    }
}