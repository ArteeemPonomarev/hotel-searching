import { createStore, applyMiddleware , combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';


const rootReducer = combineReducers({}) // need to fill the object

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)


