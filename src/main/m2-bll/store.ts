import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {loginReducer} from "../../features/f1-login/l2-bll/login-reducer";
import {hotelsWatcherSaga} from "../../features/f2-hotel-search/h2-bll/hotelSearch-sagas";
import {hotelSearchReducer} from "../../features/f2-hotel-search/h2-bll/hotel-search-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    hotels: hotelSearchReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([hotelsWatcherSaga()])
}

// types
export type AppStateType = ReturnType<typeof rootReducer>;
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;