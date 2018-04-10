import * as ADMIN from '../constants/admin';


const INITIAL_STATE = {
    id: 6,
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ADMIN.ADMIN_LOGIN:
            return {
                ...state,
                id: action.id
            };
        default :
            return false;
    }
}