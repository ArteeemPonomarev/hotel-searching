import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://engine.hotellook.com/api/v2/cache.json'
})

export const hotelsSearchApi = {
    getHotelsInfo: async (userParams: UserParamsType) =>  {
        const response = await instance.get<HotelInfo[]>('', {params: {...userParams, currency:'rub'}})
        return response.data
    }
}

export type UserParamsType = {
    location: string
    checkIn: string
    checkOut: string
    limit: string
}

export type HotelInfo = {
    pricePercentile: PricePercentileType
    priceForm: number
    priceAvg: number
    hotelId: number
    location: HotelLocation
    locationId: number
    stars: number
    hotelName: string
}

export type PricePercentileType = {
    3: number
    10: number
    35: number
    50: number
    75: number
    99: number
}

export type HotelLocation = {
    name: string
    country: string
    state: null
    geo: {
        lon: number
        lat: number
    }
}
