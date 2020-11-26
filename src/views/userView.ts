import User from '../models/UsersModel'

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            birth: user.birth,
            phone: user.phone,
            email: user.email,
            active: user.active,
            paused: user.paused,
            type: user.type
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}