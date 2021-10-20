import axios from 'axios';

// const myToken = 'e38af5b520f567205a7bf583e8d4d9e5'
// const myId = 338065;



const instance = axios.create({
    baseURL: 'http://engine.hotellook.com/api/v2/cache.json'
})

export const hotelsSearchApi = {
    getHotelsInfo (location: string, checkIn: string, checkOut: string, limit: string) {
        return instance.get<HotelInfo[]>(`?location=${location}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}`)
    }
}


type HotelInfo = {
    pricePercentile: PricePercentileType
    priceForm: number
    priceAvg: number
    hotelId: number
    location: HotelLocation
    locationId: number
    stars: number
    hotelName: string
}

type PricePercentileType = {
    3: number
    10: number
    35: number
    50: number
    75: number
    99: number
}

type HotelLocation = {
    name: string
    country: string
    state: null
    geo: {
        lon: number
        lat: number
    }
}
