import {call, takeEvery, put} from 'redux-saga/effects';
import {HotelInfo, hotelsSearchApi, UserParamsType} from "../../../main/m3-dal/mainApi";
import {hotelsActions} from "./hotel-search-reducer";


export function* fetchHotelsData(action: ReturnType<typeof fetchData>) {
    try {
        const res: HotelInfo[] = yield call(hotelsSearchApi.getHotelsInfo, action.userParams);
        yield put(hotelsActions.setHotelsInfo(res))
        console.log(res)
    } catch (e) {
    }
}

export const fetchData = (userParams: UserParamsType)  => ({
    type: 'HOTEL_SEARCH/HOTELS_DATA/SAGA', userParams
});

export function* hotelsWatcherSaga() {
    yield takeEvery('HOTEL_SEARCH/HOTELS_DATA/SAGA', fetchHotelsData);
}