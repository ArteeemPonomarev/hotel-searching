import React from 'react';
import style from './HotelsCards.module.css';
import {HotelCard} from "./HotelsCard/HotelCard";
import {HotelInfoDomainType} from "../../../h2-bll/hotel-search-reducer";

type HotelsCardsPropsType = {
    hotels: HotelInfoDomainType[]
    checkInDate: string
    amountOfDays: string
    checkInDateFormated: string
}


export const HotelsCards: React.FC<HotelsCardsPropsType> = React.memo(({hotels,checkInDate,amountOfDays,checkInDateFormated}) => {
    return (
        <div className={style.hotels_cards}>
            {hotels.map(h => {
                return (
                    <div className={style.hotel_card_wrapper} key={h.hotelId}>
                        <div className={style.hotel_logo}></div>
                        <HotelCard
                            checkInDateFormated={checkInDateFormated}
                            hotelName={h.hotelName}
                            price={h.priceAvg}
                            checkInDate={checkInDate}
                            amountDays={amountOfDays}
                            favorite={h.favorite}
                            stars={h.stars}
                            hotelId={h.hotelId}/>
                    </div>
                )
            })}

        </div>
    );
})

