import React from 'react';
import style from "./HotelsContent.module.css";
import arrow from "../../../../../assets/icons/arrow.png";
import {HotelsCarousel} from "../../../../f3-hotelsCarousel/HotelsCarousel";
import {HotelsCards} from "../HotelsCards/HotelsCards";
import {HotelInfoDomainType} from "../../../h2-bll/hotel-search-reducer";

type HotelsContentPropsType = {
    location: string
    checkInDateFormated: string
    favoritesHotels: HotelInfoDomainType[]
    amountHotels: string
    hotels: HotelInfoDomainType[]
    checkInDate: string
    amountOfDays: string
}

export const HotelsContent: React.FC<HotelsContentPropsType> = React.memo((
    {
        location,
        checkInDateFormated,
        favoritesHotels,
        amountHotels,
        hotels,
        amountOfDays,
        checkInDate
    }) => {
    return (
        <main className={style.hotels_content}>
            <header className={style.hotels_content_header}>
                <p className={style.hotel_choosen}>
                    Отели <img src={arrow} alt="arrow"/> {location}
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
