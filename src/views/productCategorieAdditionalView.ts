import CategoryAdditional from '../models/ProductCategoriesAdditionalModel'

export default {
    render(category: CategoryAdditional) {
        return {
            id: category.id,
            title: category.title,
            min: category.min,
            max: category.max,
            order: category.order,
            product: category.product,
            productAdditional: category.productAdditional
        }
    },

    renderMany(categories: CategoryAdditional[]) {
        return categories.map(category => this.render(category));
    }
}