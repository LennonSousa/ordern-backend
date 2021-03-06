import CategoryAdditional from '../models/ProductCategoriesAdditionalModel';
import productAdditionalsView from '../views/productAdditionalView';

export default {
    render(category: CategoryAdditional) {
        return {
            id: category.id,
            title: category.title,
            min: category.min,
            max: category.max,
            repeat: category.repeat,
            order: category.order,
            product: category.product,
            productAdditional: productAdditionalsView.renderMany(category.productAdditional)
        }
    },

    renderMany(categories: CategoryAdditional[]) {
        const categoriesSorted = categories.sort((a, b) => a.order - b.order);

        return categoriesSorted.map(category => this.render(category));
    }
}