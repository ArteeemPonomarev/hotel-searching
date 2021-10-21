import React from 'react';
import 'antd/dist/antd.css';
import style from './Hotels.module.css';
import {HotelsCarousel} from "../../f3-hotelsCarousel/HotelsCarousel";
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE} from "../../../common/c2-routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../main/m2-bll/store";
import {HotelSearchForm} from "./h1-ui-components/HotelSearchForm";
import moment from 'moment';
import 'moment/locale/ru';


type HotelPagePropsType = {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const Hotels: React.FC<HotelPagePropsType> = ({isAuth}) => {

    const location = useSelector<AppStateType,string>(state => state.hotels.location);
    const checkIn = useSelector<AppStateType,string >(state => state.hotels.checkIn);
    const checkOut = useSelector<AppStateType,string>(state => state.hotels.checkIn);
    const limit = useSelector<AppStateType,string>(state => state.hotels.limit);
    const dispatch = useDispatch();

    const checkInDate = moment(checkIn).format('LL');
    const checkInDateFormated = checkInDate.slice(0, checkInDate.length - 3);

    console.log(checkInDate)
    console.log(checkInDateFormated)

    // useEffect(() => {
    //     dispatch(fetchData({ location, checkIn, checkOut, limit }));
    // }, [dispatch, location, checkIn, checkOut, limit]);


    if(!isAuth) {
        return <Redirect to={LOGIN_PAGE}/>
    }

    return (
        <>
            <div className={style.hotels_wrapper}>
                <header className={style.hotels_header}>
                    <h1>Simple Hotel Check</h1>
                    <div>
                        <a className={style.hotels_logout}>Выйти</a>
                    </div>
                </header>
                <div className={style.content_wrapper}>
                    <HotelSearchForm />
                    <main className={style.hotels_content}>
                        <header className={style.hotels_content_header}>
                            <h2> Отели &gt; {location}</h2>
                            <div className={style.hotel_check_in_date}>{checkInDateFormated}</div>
                        </header>
                        <HotelsCarousel/>
                        <div className={style.hotel_favorites_amount}>Добавлено в избранное: {`js code - number`} отеля</div>
                    </main>
                    <aside className={style.hotels_favorites}>
                        <h3>Избранное</h3>
                    </aside>
                </div>
            </div>
            <div className={style.backgroundHotels}></div>
        </>
    );
};

