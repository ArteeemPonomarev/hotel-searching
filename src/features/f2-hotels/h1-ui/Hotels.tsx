import React, {useCallback, useEffect} from 'react';
import 'antd/dist/antd.css';
import style from './Hotels.module.css';
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE} from "../../../common/c1-routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {HotelSearchForm} from "./h1-ui-components/HotelSearchForm/HotelSearchForm";
import moment from 'moment';
import 'moment/locale/ru';
import {hotelsActions} from "../h2-bll/hotel-search-reducer";
import {HotelsFavoties} from "./h1-ui-components/HotelsFavorites/HotelsFavoties";
import {HotelsContent} from "./h1-ui-components/HotelsContent/HotelsContent";
import {HotelsHeader} from "./h1-ui-components/HotelsHeader/HotelsHeader";
import {getCheckInDate, getDaysAmount, getError, getFavoriteHotels, getHotels} from "../h2-bll/hotels-selectors";
import {message} from 'antd';


type HotelPagePropsType = {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const Hotels: React.FC<HotelPagePropsType> = React.memo(({isAuth, setIsAuth}) => {
    const checkIn = useSelector(getCheckInDate);
    const favoritesHotels = useSelector(getFavoriteHotels);
    const hotels = useSelector(getHotels);
    const amountOfDays = useSelector(getDaysAmount);
    const error = useSelector(getError);
    const dispatch = useDispatch();

    const checkInDate = moment(checkIn).format('LL');
    const checkInDateFormatted = checkInDate.slice(0, checkInDate.length - 3);

    useEffect(() => {
        if (error) {
            message.error(error, 1)
        }
        return () => {
            dispatch(hotelsActions.setError(''))
        };
    }, [dispatch, error])

    const logOutHandler = useCallback(() => {
        setIsAuth(false)
    }, [setIsAuth])

    if (!isAuth) {
        return <Redirect to={LOGIN_PAGE}/>
    }

    return (
        <>
            <div className={style.hotels_block_wrapper}>
                <HotelsHeader logOutHandler={logOutHandler}/>
                <div className={style.content_wrapper}>
                    <HotelSearchForm/>
                    <HotelsContent checkInDateFormatted={checkInDateFormatted}
                                   favoritesHotels={favoritesHotels}
                                   hotels={hotels}
                                   checkInDate={checkInDate}
                                   amountOfDays={amountOfDays}/>
                    <HotelsFavoties favoritesHotels={favoritesHotels}
                                    checkInDate={checkInDate}
                                    amountOfDays={amountOfDays}
                                    checkInDateFormatted={checkInDateFormatted}/>
                </div>
            </div>
            <div className={style.hotels_block_background}></div>
        </>
    );
})

