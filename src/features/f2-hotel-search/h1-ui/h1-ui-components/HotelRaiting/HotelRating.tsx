import React from 'react';
import style from "./HotelRaiting.module.css";
import selectUp from "../../../../../assets/icons/selectUp.png";

type HotelRaitingPropsType = {
    title: string
    sortBetterAtFirst: () => void
    sortWorstAtFirst: () => void
}

export const HotelRating: React.FC<HotelRaitingPropsType> = ({title, sortBetterAtFirst, sortWorstAtFirst}) => {

    return (
        <div className={style.favorities_raiting}>
            <div>{title}</div>
            <div className={style.favorities_raiting_arrows}>
                <img className={style.arrow} src={selectUp} alt="arrowUp"  onClick={sortBetterAtFirst}/>
                <img className={`${style.selectDown} ${style.arrow}`} src={selectUp} alt="arrowUp" onClick={sortWorstAtFirst}/>
            </div>
        </div>
    );
};

