import React from 'react';
import style from './HotelCard.module.css';
import dash from '../../../../assets/icons/dash.png';
import star from '../../../../assets/icons/star.png';
import emptyStar from '../../../../assets/icons/emptyStar.png';
import heart from '../../../../assets/icons/Vector (1).png'

type HotelCardPropsType = {
    hotelName: string
    amountDays: string
    price: number
    stars: number
    favorite: boolean
    checkInDate: string
}

export const HotelCard: React.FC<HotelCardPropsType> = (props) => {

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


    return (
        <div className={style.hotel_card}>
            <div className={style.hotel_card_description}>
                <p className={style.hotelName}>{props.hotelName}</p>
                <p className={style.hotel_dates}>
                    <span>{props.checkInDate}</span><img src={dash} alt="dash"/><span>{props.amountDays}</span>
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
            <div>
                <div><img src={heart} alt="like"/></div>
                <div >{props.price}</div>
            </div>
        </div>
    );
};
