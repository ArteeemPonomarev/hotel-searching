import React from 'react';
import 'antd/dist/antd.css';
import style from './Hotels.module.css';
import {HotelsCarousel} from "../../f3-hotelsCarousel/HotelsCarousel";
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE} from "../../../common/c2-routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../main/m2-bll/store";
import {HotelSearchForm} from "./h1-ui-components/HotelSearchForm";


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
                            <h2> Отели &gt; Москва</h2>
                            <div className={style.hotel_check_in_date}>Значение даты заезда</div>
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

