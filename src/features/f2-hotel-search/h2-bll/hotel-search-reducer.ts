import moment from "moment";
import {InferActionsType} from "../../../main/m2-bll/store";
import {HotelInfo, HotelLocation, PricePercentileType} from "../../../main/m3-dal/mainApi";
import place1 from '../../../assets/placesImages/placeImg1.png';
import place2 from '../../../assets/placesImages/placeImg2.png';
import place3 from '../../../assets/placesImages/placeImg3.png';

const currentDate = moment().format('YYYY-MM-DD')

const initialState = {
    places: [
        {
            title: 'place1',
            id: '1',
            img: place1
        },
        {
            title: 'place2',
            id: '2',
            img: place2
        },
        {
            title: 'place3',
            id: '3',
            img: place3,
        },
        {
            title: 'place4',
            id: '4',
            img: place1
        },
        {
            title: 'place5',
            id: '5',
            img: place2
        },
        {
            title: 'place6',
            id: '6',
            img: place3
        },
    ],
    location: 'Москва',
    hotels: [] as HotelInfoDomainType[],
    checkIn: currentDate,
    checkOut: '',
    limit: '10',
    daysAmount: '1',
    favoritesHotels: [] as HotelInfoDomainType[],
    status: 'loading' as RequestStatusType,
    error: ''
}
enum HotelsEvents {
    SET_HOTELS_INFO = 'SET-HOTELS-INFO',
    SET_USERS_PARAMS = 'SET-USERS-PARAMS',
    SET_FAVORITE_HOTEL = 'SET-FAVORITE-HOTEL',
    ADD_FAVORITE_HOTEL = 'ADD-FAVORITE-HOTEL',
    REMOVE_FAVORITE_HOTEL = 'REMOVE-FAVORITE-HOTEL',
    SET_THE_BEST_RATING_HOTELS = 'SET-THE-BEST-RATING-HOTELS',
    SET_THE_WORST_RATING_HOTELS = 'SET-THE-WORST-RATING-HOTELS',
    SET_MOST_EXPENSIVE_HOTELS = 'SET-MOST-EXPENSIVE-HOTELS',
    SET_THE_CHEAPEST_HOTELS = 'SET-MOST-CHEAPEST-HOTELS',
    SET_STATUS = 'SET-STATUS',
    SET_ERROR = 'SET-ERROR'
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
    setFavoriteHotel: (favorite: boolean, hotelId: number) => {
        return {
            type: HotelsEvents.SET_FAVORITE_HOTEL,
            payload: {hotelId, favorite}
        } as const
    },
    addFavoriteHotel: (hotelId: number) => {
        return {
            type: HotelsEvents.ADD_FAVORITE_HOTEL,
            payload: hotelId
        } as const
    },
    removeFavoriteHotel: (hotelId: number) => {
        return {
            type: HotelsEvents.REMOVE_FAVORITE_HOTEL,
            payload: hotelId
        } as const
    },
    setBestRatingHotels: () => {
        return {
            type: HotelsEvents.SET_THE_BEST_RATING_HOTELS,
        } as const
    },
    setWorstRaitingHotels: () => {
        return {
            type: HotelsEvents.SET_THE_WORST_RATING_HOTELS,
        } as const
    },
    setMostExpensiveHotels: () => {
        return {
            type: HotelsEvents.SET_MOST_EXPENSIVE_HOTELS,
        } as const
    },
    setTheCheapestHotels: () => {
        return {
            type: HotelsEvents.SET_THE_CHEAPEST_HOTELS,
        } as const
    },
    setStatus: (status: RequestStatusType) => {
        return {
            type: HotelsEvents.SET_STATUS,
            payload: status
        }as const
    },
    setError: (error: string) => {
        return {
            type: HotelsEvents.SET_ERROR,
            payload: error
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
        case HotelsEvents.SET_FAVORITE_HOTEL:
            const hotels = state.hotels.map(h => h.hotelId === action.payload.hotelId ? {...h, favorite: action.payload.favorite} : h);
            return {...state, hotels}
        case HotelsEvents.ADD_FAVORITE_HOTEL:
            return {...state, favoritesHotels: [...state.favoritesHotels, ...state.hotels.filter(h => h.hotelId === action.payload)]};
        case HotelsEvents.REMOVE_FAVORITE_HOTEL:
            return {...state, favoritesHotels: state.favoritesHotels.filter(h => h.hotelId !== action.payload)};
        case HotelsEvents.SET_THE_BEST_RATING_HOTELS:
            return {...state, favoritesHotels: [...state.favoritesHotels.sort((a, b) => b.stars - a.stars)]}
        case HotelsEvents.SET_THE_WORST_RATING_HOTELS:
            return {...state, favoritesHotels: [...state.favoritesHotels.sort((a, b) => a.stars - b.stars)]}
        case HotelsEvents.SET_MOST_EXPENSIVE_HOTELS:
            return {...state, favoritesHotels: [...state.favoritesHotels.sort((a, b) => b.priceAvg - a.priceAvg)]}
        case HotelsEvents.SET_THE_CHEAPEST_HOTELS:
            return {...state, favoritesHotels: [...state.favoritesHotels.sort((a, b) => a.priceAvg - b.priceAvg)]}
        case HotelsEvents.SET_STATUS:
            return {...state, status: action.payload}
        case HotelsEvents.SET_ERROR:
            return {...state, error: action.payload}

        default:
            return state
    }
}

//types
type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof hotelsActions>;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

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