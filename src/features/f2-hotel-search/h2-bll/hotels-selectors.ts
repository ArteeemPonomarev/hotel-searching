import {AppStateType} from "../../../main/m2-bll/store";
import {HotelInfoDomainType} from "./hotel-search-reducer";

export const getCheckInDate = (state: AppStateType): string => {
    return state.hotels.checkIn
};
export const checkOutDateFromState = (state: AppStateType): string => {
    return state.hotels.checkOut
};
export const getLimit = (state: AppStateType): string => {
    return state.hotels.limit
};
export const getLocation = (state: AppStateType): string => {
    return state.hotels.location
};

export const getHotels = (state: AppStateType): HotelInfoDomainType[] => {
    return state.hotels.hotels
};
export const getFavoriteHotels = (state: AppStateType): HotelInfoDomainType[] => {
    return state.hotels.favoritesHotels
};
export const getDaysAmount = (state: AppStateType): string => {
    return state.hotels.daysAmount
};

export const getImagesForCarousel = (state: AppStateType) => {
    return state.hotels.places
};

export const getError = (state: AppStateType) => {
    return state.hotels.error
}