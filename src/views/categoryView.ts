import Category from '../models/CategoriesModel'

export default {
    render(category: Category) {
        return {
            id: category.id,
            title: category.title,
            paused: category.paused,
            order: category.order,
            products: category.products
        }
    },

    renderMany(categories: Category[]) {
        return categories.map(category => this.render(category));
    }
}