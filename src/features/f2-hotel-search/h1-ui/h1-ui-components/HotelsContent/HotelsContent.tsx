import React, {useEffect} from 'react';
import style from "./HotelsContent.module.css";
import arrow from "../../../../../assets/icons/arrow.png";
import {HotelsCarousel} from "../../../../f3-hotelsCarousel/HotelsCarousel";
import {HotelsCards} from "./HotelsCards/HotelsCards";
import {HotelInfoDomainType} from "../../../h2-bll/hotel-search-reducer";
import {fetchData} from '../../../h2-bll/hotelSearch-sagas';
import {useDispatch, useSelector} from 'react-redux';
import {getCheckOutDate} from "../../../../../utils/getCheckOutDate";
import {wordEnd} from "../../../../../utils/wordEnd";
import {getCheckInDate, getLimit, getLocation} from "../../../h2-bll/hotels-selectors";

type HotelsContentPropsType = {
    checkInDateFormated: string
    favoritesHotels: HotelInfoDomainType[]
    hotels: HotelInfoDomainType[]
    checkInDate: string
    amountOfDays: string
}

export const HotelsContent: React.FC<HotelsContentPropsType> = React.memo((
    {
        checkInDateFormated,
        favoritesHotels,
        hotels,
        checkInDate,
        amountOfDays
    }) => {

    const location = useSelector(getLocation);
    const checkIn = useSelector(getCheckInDate);
    const limit = useSelector(getLimit);
    const checkOut = getCheckOutDate(checkIn, amountOfDays);
    const amountHotels = wordEnd(favoritesHotels.length, '', ['отель', 'отеля', 'отелей']);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData({location, checkIn, checkOut, limit}))
    }, [dispatch, location, checkIn, checkOut, limit]);

    return (
        <main className={style.hotels_content}>
            <header className={style.hotels_content_header}>
                <p className={style.hotel_choosen}>
                    Отели <img src={arrow} alt="arrow"/> {location[0].toUpperCase() + location.slice(1)}
                </p>
                <div className={style.hotel_check_in_date}>
                    {checkInDateFormated}
                </div>
            </header>
            <HotelsCarousel/>
            <div className={style.hotel_favorites_amount}>
                Добавлено в Избранное: <span className={style.amount_favorities_hotels}>
                            {favoritesHotels.length} </span>
                {amountHotels}
            </div>
            <HotelsCards hotels={hotels}
                         checkInDate={checkInDate}
                         amountOfDays={amountOfDays}
                         checkInDateFormated={checkInDateFormated}/>
        </main>
    );
})