import React from 'react';
import style from './HotelCard.module.css';

export const HotelCard = () => {
    return (
        <div className={style.hotel_card}>
            <img alt={'hotel-logo'}/>
            <div className={style.hotel_description}>
                <h3>{`Название отеля`}</h3>
                <div>{`дата`}</div>
                <div>{'кол-во звезд'}</div>
            </div>

        </div>
    );
};
