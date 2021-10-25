import React from 'react';
import style from "./HotelRaiting.module.css";
import selectGreenUp from "../../../../../../assets/icons/selectGreen.png";
import selectGrayDown from "../../../../../../assets/icons/selectGrey.png";


type HotelRaitingPropsType = {
    title: string
    sortBetterAtFirst: () => void
    sortWorstAtFirst: () => void
    isDisabled: boolean
}

export const HotelRating: React.FC<HotelRaitingPropsType> = (
    {
        title,
        sortBetterAtFirst,
        sortWorstAtFirst,
        isDisabled,
    }) => {


    const select = isDisabled ? selectGrayDown : selectGreenUp;
    const classForSelectUp = isDisabled ? `${style.arrow} ${style.select_rotated}` : `${style.arrow}`;
    const classForDownUp = isDisabled ? `${style.arrow}` : `${style.arrow} ${style.select_rotated}`;
    const classForDisabled = !isDisabled
        ? `${style.favorites_rating}`
        : `${style.favorites_rating} ${style.favorites_rating_disabled}`;


    return (
        <div className={classForDisabled}>
            <div>{title}</div>
            <div className={style.favorites_rating_arrows}>
                <img className={classForSelectUp} src={select} alt="arrowUp" onClick={sortBetterAtFirst}/>
                <img className={classForDownUp} src={select} alt="arrowUp" onClick={sortWorstAtFirst}/>

            </div>
        </div>
    );
};

