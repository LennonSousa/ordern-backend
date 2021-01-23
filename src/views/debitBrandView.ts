import DebitBrand from '../models/DebitBrandsModel'

export default {
    render(debitBrand: DebitBrand) {
        return {
            id: debitBrand.id,
            name: debitBrand.name,
            code: debitBrand.code
        }
    },

    renderMany(debitBrands: DebitBrand[]) {
        return debitBrands.map(debitBrand => this.render(debitBrand));
    }
}