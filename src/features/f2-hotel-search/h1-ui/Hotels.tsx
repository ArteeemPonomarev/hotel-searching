import React, {useCallback, useEffect} from 'react';
import 'antd/dist/antd.css';
import style from './Hotels.module.css';
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE} from "../../../common/c2-routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../main/m2-bll/store";
import {HotelSearchForm} from "./h1-ui-components/HotelSearchForm/HotelSearchForm";
import moment from 'moment';
import 'moment/locale/ru';
import {wordEnd} from "../../../utils/wordEnd";
import {fetchData} from '../h2-bll/hotelSearch-sagas';
import {HotelInfoDomainType} from "../h2-bll/hotel-search-reducer";
import {HotelsFavoties} from "./h1-ui-components/HotelsFavorites/HotelsFavoties";
import {HotelsContent} from "./h1-ui-components/HotelsContent/HotelsContent";
import {HotelsHeader} from "./h1-ui-components/HotelsHeader/HotelsHeader";


type HotelPagePropsType = {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const Hotels: React.FC<HotelPagePropsType> = ({isAuth, setIsAuth}) => {

    const location = useSelector<AppStateType, string>(state => state.hotels.location);
    const checkIn = useSelector<AppStateType, string>(state => state.hotels.checkIn);
    const checkOut = useSelector<AppStateType, string>(state => state.hotels.checkIn);
    const limit = useSelector<AppStateType, string>(state => state.hotels.limit);
    const favoritesHotels = useSelector<AppStateType, HotelInfoDomainType[]>(state => state.hotels.favoritesHotels);
    const hotels = useSelector<AppStateType, HotelInfoDomainType[]>(state => state.hotels.hotels);
    const amountOfDays = useSelector<AppStateType, string>(state => state.hotels.daysAmount);

    const dispatch = useDispatch();

    const checkInDate = moment(checkIn).format('LL');
    const checkInDateFormated = checkInDate.slice(0, checkInDate.length - 3);

    console.log(checkInDate)
    console.log(checkInDateFormated)


    useEffect(() => {
        dispatch(fetchData({location, checkIn, checkOut, limit}));
    }, [dispatch, location, checkIn, checkOut, limit]);

    const logOutHandler = useCallback(() => {
        setIsAuth(false)
    }, [setIsAuth])

    const amountHotels = wordEnd(favoritesHotels.length, '', ['отель', 'отеля', 'отелей']);

    if (!isAuth) {
        return <Redirect to={LOGIN_PAGE}/>
    }

    return (
        <>
            <div className={style.hotels_wrapper}>
                <HotelsHeader logOutHandler={logOutHandler}/>
                <div className={style.content_wrapper}>
                    <HotelSearchForm/>
                    <HotelsContent location={location}
                                   checkInDateFormated={checkInDateFormated}
                                   favoritesHotels={favoritesHotels}
                                   amountHotels={amountHotels}
                                   hotels={hotels}
                                   checkInDate={checkInDate}
                                   amountOfDays={amountOfDays}/>
                    <HotelsFavoties favoritesHotels={favoritesHotels}
                                    checkInDate={checkInDate}
                                    amountOfDays={amountOfDays}
                                    checkInDateFormated={checkInDateFormated}/>
                </div>
            </div>
            <div className={style.backgroundHotels}></div>
        </>
    );
};

