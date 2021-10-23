import React, {useCallback} from 'react';
import style from './HotelsFavoties.module.css';
import {HotelRating} from "../HotelRaiting/HotelRating";
import {HotelCard} from "../HotelsCards/HotelsCard/HotelCard";
import {HotelInfoDomainType, hotelsActions} from "../../../h2-bll/hotel-search-reducer";
import {useDispatch} from "react-redux";

type HotelsFavotiesPropsTitle = {
    favoritesHotels: HotelInfoDomainType[]
    checkInDate: string
    amountOfDays: string
    checkInDateFormated: string
}

export const HotelsFavoties:React.FC<HotelsFavotiesPropsTitle> = React.memo(({favoritesHotels,checkInDate, amountOfDays, checkInDateFormated}) => {
    const dispatch = useDispatch()

    const setBestRaitingHotels = useCallback(() => {
        dispatch(hotelsActions.setBestRaitingHotels())
    }, [dispatch, hotelsActions.setBestRaitingHotels])

    const setWorstRatingHotel = useCallback(() => {
        dispatch(hotelsActions.setWorstRaitingHotels())
    }, [dispatch, hotelsActions.setWorstRaitingHotels])

    const setMostExpensiveHotels = useCallback(() => {
        dispatch(hotelsActions.setMostExpensiveHotels())
    }, [dispatch, hotelsActions.setMostExpensiveHotels])
    const setTheCheapestHotels = useCallback(() => {
        dispatch(hotelsActions.setTheCheapestHotels())
    }, [dispatch, hotelsActions.setTheCheapestHotels])

    return (
        <aside className={style.favorites_hotels}>
            <h3 className={style.favorites_title}>Избранное</h3>
            <div className={style.selectionBlock}>
                <HotelRating title={'Рейтинг'}
                             sortBetterAtFirst={setBestRaitingHotels}
                             sortWorstAtFirst={setWorstRatingHotel}/>
                <HotelRating title={'Цена'}
                             sortBetterAtFirst={setMostExpensiveHotels}
                             sortWorstAtFirst={setTheCheapestHotels}/>
            </div>
            <div className={style.favorites_hotels_list}>
                {favoritesHotels.map(h => {
                    return (
                        <div className={style.favorites_cards}>
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
        </aside>
    );
});

