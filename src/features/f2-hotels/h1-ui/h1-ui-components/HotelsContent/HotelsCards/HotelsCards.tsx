import React from 'react';
import 'antd/dist/antd.css';
import style from './HotelsCards.module.css';
import {HotelCard} from "./HotelsCard/HotelCard";
import {HotelInfoDomainType} from "../../../../h2-bll/hotel-search-reducer";
import {useSelector} from "react-redux";
import {Empty, Spin} from 'antd';
import {getStatus} from "../../../../h2-bll/hotels-selectors";

type HotelsCardsPropsType = {
    hotels: HotelInfoDomainType[]
    checkInDate: string
    amountOfDays: string
    checkInDateFormatted: string
}


export const HotelsCards: React.FC<HotelsCardsPropsType> = React.memo((
    {
        hotels,
        checkInDate,
        amountOfDays,
        checkInDateFormatted
    }) => {
    const status = useSelector(getStatus);

    const hotelsCards = hotels.map(h => {
        return (
            <div className={style.hotel_card_wrapper} key={h.hotelId}>
                <div className={style.hotel_logo}></div>
                <HotelCard
                    checkInDateFormated={checkInDateFormatted}
                    hotelName={h.hotelName}
                    price={h.priceAvg}
                    checkInDate={checkInDate}
                    amountDays={amountOfDays}
                    favorite={h.favorite}
                    stars={h.stars}
                    hotelId={h.hotelId}/>
            </div>
        )
    })

    return (
        <div className={style.hotels_cards}>
            {status === 'loading'
                ? <div className={style.hotels_cards_spin}>
                    <Spin size={'large'}/>
                </div>
                : null
            }
            {hotels.length
                ? hotelsCards
                : <div>
                    <Empty description={<span>Список отелей пуст...</span>}/>
                </div>}
        </div>
    );
})
