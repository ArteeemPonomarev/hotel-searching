import {InferActionsType} from "../../../main/m2-bll/store";
import {HotelInfo} from "../../../main/m3-dal/mainApi";

const initialState = {
    location: 'Moscow',
    hotels: [] as HotelInfo[],
    checkIn: '2021-10-25',
    ckeckOut: '2021-10-30',
    limit: '10'
}

enum HotelsEvents {
    SET_HOTELS_INFO = 'SET-HOTELS-INFO',
    SET_HOTELS_LOCATION = 'SET-HOTEL-LOCATION'
}

export const hotelsActions = {
    setLocation: (location: string) => {
        return {
            type: HotelsEvents.SET_HOTELS_LOCATION,
            payload: location
        } as const
    },

}



export const hotelSearchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case HotelsEvents.SET_HOTELS_LOCATION:
            return {...state, location: action.payload}
        default:
            return state
    }
}

//types
type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof hotelsActions>