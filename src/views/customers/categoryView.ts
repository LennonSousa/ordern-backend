import Category from '../../models/CategoriesModel';
import productsView from './productView';

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
        //console.log('categoryView started...');
        const updatedCategories = categories.sort((a, b) => a.order - b.order);

        //console.log('categoryView finished...');
        return updatedCategories.map(category => this.render(category));
    }
}