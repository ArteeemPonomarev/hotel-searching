import React, {useCallback} from 'react';
import style from './HotelsFavoties.module.css';
import {HotelRating} from "./HotelRaiting/HotelRating";
import {HotelCard} from "../HotelsContent/HotelsCards/HotelsCard/HotelCard";
import {FavoritesHotelType, hotelsActions} from "../../../h2-bll/hotel-search-reducer";
import {useDispatch} from "react-redux";
import {Empty} from "antd";

type HotelsFavotiesPropsTitle = {
    favoritesHotels: FavoritesHotelType[]
    checkInDate: string
    amountOfDays: string
    checkInDateFormatted: string
}

export const HotelsFavoties: React.FC<HotelsFavotiesPropsTitle> = React.memo((
    {
        favoritesHotels,
        checkInDateFormatted
    }) => {
    const dispatch = useDispatch()

    const setBestRatingHotels = useCallback(() => {
        dispatch(hotelsActions.setBestRatingHotels());
    }, [dispatch]);
    const setWorstRatingHotel = useCallback(() => {
        dispatch(hotelsActions.setWorstRaitingHotels());
        ;
    }, [dispatch]);
    const setMostExpensiveHotels = useCallback(() => {
        dispatch(hotelsActions.setMostExpensiveHotels())
    }, [dispatch]);
    const setTheCheapestHotels = useCallback(() => {
        dispatch(hotelsActions.setTheCheapestHotels())
    }, [dispatch])

    const favoritesHotelsList = favoritesHotels.map(h => {
        return (
            <div key={`${h.hotelId} ${h.amountsOfDays}`} className={style.favorites_cards}>
                <HotelCard
                    checkInDateFormated={checkInDateFormatted}
                    hotelName={h.hotelName}
                    price={h.priceAvg}
                    checkInDate={h.checkIn}
                    amountDays={h.amountsOfDays}
                    favorite={h.favorite}
                    stars={h.stars}
                    hotelId={h.hotelId}/>
            </div>
        )
    })

    const isDisabled = favoritesHotelsList.length < 2;

    return (
        <aside className={style.favorites_hotels}>
            <h3 className={style.favorites_title}>Избранное</h3>
            <div className={style.selectionBlock}>
                <HotelRating title={'Рейтинг'}
                             sortBetterAtFirst={setBestRatingHotels}
                             sortWorstAtFirst={setWorstRatingHotel}
                             isDisabled={isDisabled}/>
                <HotelRating title={'Цена'}
                             sortBetterAtFirst={setMostExpensiveHotels}
                             sortWorstAtFirst={setTheCheapestHotels}
                             isDisabled={isDisabled}/>
            </div>
            <div className={style.favorites_hotels_list}>
                {favoritesHotels.length
                    ? favoritesHotelsList
                    : <div style={{paddingTop: '50px'}}>
                        <Empty description={<span>Добавьте отель в избранное</span>}/>
                    </div>}
            </div>
        </aside>
    );
});

