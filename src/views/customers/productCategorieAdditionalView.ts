import CategoryAdditional from '../../models/ProductCategoriesAdditionalModel';
import productAdditionalsView from './productAdditionalView';

export default {
    render(category: CategoryAdditional) {
        return {
            id: category.id,
            title: category.title,
            min: category.min,
            max: category.max,
            repeat: category.repeat,
            order: category.order,
            productAdditional: productAdditionalsView.renderMany(category.productAdditional)
        }
    },

    renderMany(categories: CategoryAdditional[]) {
        console.log('productCategoryAdditionalView started...');
        const categoriesSorted = categories.sort((a, b) => a.order - b.order);

        console.log('productCategoryAdditionalView finished...');
        return categoriesSorted.map(category => this.render(category));
    }
}