import User from '../models/UsersModel';
import userTypeView from '../views/userTypeView';

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
            created_at: user.created_at,
            type: userTypeView.render(user.type)
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}