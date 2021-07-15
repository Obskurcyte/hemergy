import {AUTH, LOGOUT} from '../actions/auth';


const initialState = {
    authData: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('userDataHemergy',
                    JSON.stringify({...action?.data})
                )
            console.log(action?.data);
            return {...state, authData: action?.data};
        default:
            return state
    }
}

export default authReducer