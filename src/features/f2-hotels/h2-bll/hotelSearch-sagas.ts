import {call, put, takeEvery} from 'redux-saga/effects';
import {HotelInfo, hotelsSearchApi, UserParamsType} from "../../../main/m3-dal/mainApi";
import {hotelsActions} from "./hotel-search-reducer";


export function* fetchHotelsData(action: ReturnType<typeof fetchData>) {
    yield put(hotelsActions.setStatus('loading'))
    try {
        const res: HotelInfo[] = yield call(hotelsSearchApi.getHotelsInfo, action.userParams);
        yield put(hotelsActions.setHotelsInfo(res))
        yield put(hotelsActions.setStatus('succeeded'))
    } catch (e) {
        yield put(hotelsActions.setError('Some error was occurred!'))
        yield put(hotelsActions.setStatus('failed'))
    }
}

export const fetchData = (userParams: UserParamsType) => ({
    type: 'HOTEL-SEARCH/HOTELS-DATA/SAGA', userParams
});

export function* hotelsWatcherSaga() {
    yield takeEvery('HOTEL-SEARCH/HOTELS-DATA/SAGA', fetchHotelsData);
}