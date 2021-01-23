import CreditBrand from '../models/CreditBrandsModel'

export default {
    render(creditBrand: CreditBrand) {
        return {
            id: creditBrand.id,
            name: creditBrand.name,
            code: creditBrand.code
        }
    },

    renderMany(creditBrands: CreditBrand[]) {
        return creditBrands.map(creditBrand => this.render(creditBrand));
    }
}