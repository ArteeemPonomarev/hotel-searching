import { createStore, applyMiddleware , combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {loginReducer} from "../../features/f1-login/l2-bll/login-reducer";


const rootReducer = combineReducers({
    login: loginReducer
})

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)
)

// types
export type AppStateType = ReturnType<typeof rootReducer>;
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

//@ts-ignore
window.store = store
