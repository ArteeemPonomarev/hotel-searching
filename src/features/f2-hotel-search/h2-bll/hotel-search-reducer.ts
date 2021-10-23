import {InferActionsType} from "../../../main/m2-bll/store";
import {HotelInfo, HotelLocation, PricePercentileType} from "../../../main/m3-dal/mainApi";

const initialState = {
    location: 'Москва',
    hotels: [] as HotelInfoDomainType[],
    checkIn: '2021-10-25',
    checkOut: '2021-10-30',
    limit: '10',
    daysAmount: '10',
    favoritesHotels: [] as HotelInfoDomainType[]
}

enum HotelsEvents {
    SET_HOTELS_INFO = 'SET-HOTELS-INFO',
    SET_USERS_PARAMS = 'SET-USERS-PARAMS',
    SET_FAVORITIE_HOTEL = 'SET-FAVOTITIE_HOTEL'
}

export const hotelsActions = {
    setHotelsInfo: (hotelsInfo: HotelInfo[]) => {
        return {
            type: HotelsEvents.SET_HOTELS_INFO,
            payload: hotelsInfo
        } as const
    },
    setUserParams: (location: string, checkIn: string, daysAmount: string, checkOut: string) => {
        return {
            type: HotelsEvents.SET_USERS_PARAMS,
            payload: {location, checkIn, daysAmount, checkOut}
        } as const
    },
    setFavoriteHotel: (favorite: boolean) => {
        return {
            type: HotelsEvents.SET_FAVORITIE_HOTEL,
            payload: favorite
        } as const
    },
}



export const hotelSearchReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case HotelsEvents.SET_HOTELS_INFO:
            return {...state, hotels: action.payload.map(h => ({...h, favorite: false}))}
        case HotelsEvents.SET_USERS_PARAMS:
            return {
                ...state,
                location: action.payload.location,
                daysAmount: action.payload.daysAmount,
                checkIn: action.payload.checkIn,
                checkOut: action.payload.checkOut
            }
        default:
            return state
    }
}

//types
type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof hotelsActions>

export type HotelInfoDomainType = {
    pricePercentile: PricePercentileType
    priceForm: number
    priceAvg: number
    hotelId: number
    location: HotelLocation
    locationId: number
    stars: number
    hotelName: string
    favorite: boolean
}