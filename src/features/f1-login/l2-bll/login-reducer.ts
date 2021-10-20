import {InferActionsType} from "../../../main/m2-bll/store";

const initialState: initialStateType = {
    email: null,
    password: null,
    isLoggedIn: true
}

enum AuthEvents {
    SET_USER_DATA = 'SET_USER_DATA'
}

export const authActions = {
    setUserData: (payload: initialStateType) => {
        return {
            type: AuthEvents.SET_USER_DATA,
            payload
        }
    }
}


export const loginReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch(action.type) {
        case AuthEvents.SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}


//types
type initialStateType = {
    email: null | string
    password: null | string
    isLoggedIn: boolean
}
type ActionsType = InferActionsType<typeof authActions>