import React from 'react';
import style from './Hotels.module.css';
import {Form} from "antd";
import {HotelsCarousel} from "../../f3-hotelsCarousel/HotelsCarousel";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE} from "../../../common/c2-routes/routes";

export const Hotels = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)

    if(!isLoggedIn) {
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
                    <aside className={style.hotels_searchFrom}>
                        <Form>

                        </Form>
                    </aside>
                    <main className={style.hotels_content}>
                        <header className={style.hotels_content_header}>
                            <h2> Отели &gt; Москва</h2>
                            <div className={style.hotel_check_in_date}>Значение даты заезда</div>
                        </header>
                        <HotelsCarousel/>
                        <div className={style.hotel_favortes_amount}>Добавлено в избранное: {`js code - number`} отеля</div>
                    </main>
                    <aside className={style.hotels_favorites}>

                    </aside>
                </div>
            </div>
            <div className={style.backgroundHotels}></div>
        </>
    );
};

