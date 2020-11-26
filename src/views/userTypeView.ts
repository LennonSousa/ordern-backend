import Types from '../models/UserTypesModel'

export default {
    render(type: Types) {
        return {
            id: type.id,
            type: type.type,
            description: type.description,
            code: type.code
        }
    },

    renderMany(types: Types[]) {
        return types.map(type => this.render(type));
    }
}