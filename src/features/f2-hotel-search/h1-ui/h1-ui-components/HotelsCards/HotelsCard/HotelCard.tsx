import React, {useCallback} from 'react';
import style from './HotelCard.module.css';
import dash from '../../../../../../assets/icons/dash.png';
import star from '../../../../../../assets/icons/star.png';
import emptyStar from '../../../../../../assets/icons/emptyStar.png';
import heart from '../../../../../../assets/icons/heart.png'
import redHeart from '../../../../../../assets/icons/redHeart.png'
import {useDispatch} from "react-redux";
import {hotelsActions} from "../../../../h2-bll/hotel-search-reducer";
import {wordEnd} from "../../../../../../utils/wordEnd";

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
    const dispatch = useDispatch()

    const starsElement = (stars: number) => {
        let starsArr = []
        for (let i = 0; i < 5; i++) {
            if (stars > i) {
                starsArr.push(1)
            } else {
                starsArr.push(0)
            }
        }
        return starsArr
    }

    const followHotel = useCallback(() => {
        dispatch(hotelsActions.setFavoriteHotel(true, props.hotelId));
        dispatch(hotelsActions.addFavoriteHotel(props.hotelId));
    }, [dispatch, props.hotelId])
    const unFollowHotel = useCallback(() => {
        dispatch(hotelsActions.setFavoriteHotel(false, props.hotelId));
        dispatch(hotelsActions.removeFavoriteHotel(props.hotelId));
    }, [dispatch, props.hotelId])

    const days = wordEnd(+props.amountDays, '', ['день', 'дня', 'дней'])

    return (
        <div className={style.hotel_card}>
            <div className={style.hotel_card_description}>
                <p className={style.hotelName}>{props.hotelName}</p>
                <p className={style.hotel_dates}>
                    <span>{props.checkInDateFormated}</span>
                    <img className={style.hotel_checkin_date_dash} src={dash} alt="dash"/>
                    <span>{props.amountDays} {days}</span>
                </p>
                <p style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {starsElement(props.stars).map(s => {
                            if (s === 1) {
                                return (
                                    <img src={star} alt="star"/>
                                )
                            } else {
                                return (
                                    <img src={emptyStar} alt="emptyStar"/>
                                )
                            }
                        })}
                    </div>
                    <div className={style.hotel_price}>Price:</div>
                </p>
            </div>
            <div className={style.hotel_cars_options}>
                <div className={style.hotel_card_favorite}>
                    {props.favorite ?
                        <img src={redHeart} alt="like" onClick={unFollowHotel}/>
                        : <img src={heart} alt="like" onClick={followHotel}/>
                    }

                </div>
                <div className={style.hotel_card_price_amount}>{props.price} {'\u20BD'}</div>
            </div>
        </div>
    );
};