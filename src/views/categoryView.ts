import Category from '../models/CategoriesModel';
import productsView from '../views/productView';

export default {
    render(category: Category) {
        return {
            id: category.id,
            title: category.title,
            paused: category.paused,
            order: category.order,
            products: category.products ? productsView.renderMany(category.products) : []
        }
    },

    renderMany(categories: Category[]) {
        const categoriesSorted = categories.sort((a, b) => a.order - b.order);

        return categoriesSorted.map(category => this.render(category));
    }
}