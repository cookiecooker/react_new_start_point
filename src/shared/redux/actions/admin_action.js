import * as ADMIN from '../constants/admin';

export const admin_function = (id) => {

    return {
        type:ADMIN.ADMIN_LOGIN,
        id: id
    }
}