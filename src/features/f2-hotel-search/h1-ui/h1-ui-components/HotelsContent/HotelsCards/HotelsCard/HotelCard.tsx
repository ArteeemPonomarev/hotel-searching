import React, {useCallback} from 'react';
import style from './HotelCard.module.css';
import dash from '../../../../../../../assets/icons/dash.png';
import star from '../../../../../../../assets/icons/star.png';
import emptyStar from '../../../../../../../assets/icons/emptyStar.png';
import heart from '../../../../../../../assets/icons/heart.png'
import redHeart from '../../../../../../../assets/icons/redHeart.png'
import {useDispatch} from "react-redux";
import {hotelsActions} from "../../../../../h2-bll/hotel-search-reducer";
import {wordEnd} from "../../../../../../../utils/wordEnd";
import {starsElement} from '../../../../../../../utils/getHotelStarsArray';

type HotelCardPropsType = {
    hotelName: string
    amountDays: string
    price: number
    stars: number
    favorite: boolean
    checkInDate: string
    hotelId: number
    checkInDateFormated: string
}

export const HotelCard: React.FC<HotelCardPropsType> = (props) => {
    const dispatch = useDispatch();

    const followHotel = useCallback(() => {
        dispatch(hotelsActions.setFavoriteHotel(true, props.hotelId));
        dispatch(hotelsActions.addFavoriteHotel(props.hotelId));
    }, [dispatch, props.hotelId]);
    const unFollowHotel = useCallback(() => {
        dispatch(hotelsActions.setFavoriteHotel(false, props.hotelId));
        dispatch(hotelsActions.removeFavoriteHotel(props.hotelId));
    }, [dispatch, props.hotelId]);

    const days = wordEnd(+props.amountDays, '', ['день', 'дня', 'дней']);

    const hotelStars = starsElement(props.stars).map(s => {
        if (s.value === 1) {
            return (
                <img key={s.id} src={star} alt="star"/>
            )
        } else {
            return (
                <img key={s.id} src={emptyStar} alt="emptyStar"/>
            )
        }
    })

    return (
        <div className={style.hotel_card}>
            <div className={style.hotel_card_description}>
                <p className={style.hotelName}>{props.hotelName}</p>
                <p className={style.hotel_dates}>
                    <span>{props.checkInDateFormated}</span>
                    <img className={style.hotel_checkin_date_dash} src={dash} alt="dash"/>
                    <span>{props.amountDays} {days}</span>
                </p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {hotelStars}
                    </div>
                    <div className={style.hotel_price}>Price:</div>
                </div>
            </div>
            <div className={style.hotel_cards_options}>
                <div className={style.hotel_card_favorite}>
                    {props.favorite ?
                        <img src={redHeart} alt="like" onClick={unFollowHotel}/>
                        : <img src={heart} alt="like" onClick={followHotel}/>
                    }
                </div>
                <div className={style.hotel_card_price_amount}>{props.price.toFixed()} {'\u20BD'}</div>
            </div>
        </div>
    );
};
