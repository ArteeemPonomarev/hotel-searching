import React from 'react';
import 'antd/dist/antd.css';
import style from './Hotels.module.css';
import {Button, DatePicker, Form, Input} from "antd";
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
                        <Form className={style.searchForm_location}>
                            <Form.Item
                                name="location"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input city!',
                                    },
                                ]}
                            >
                                <Input type="text"
                                       name="location"
                                       placeholder="Введите город"
                                />
                            </Form.Item>
                            <Form.Item
                                name="checkInDate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input check-in date!',
                                    },
                                ]}>
                                <DatePicker className={style.datepicker_checkIn}/>
                            </Form.Item>
                            <Form.Item
                                name="checkOutDate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input amount of days!',
                                    },
                                ]}
                            >
                                <Input type="text"
                                       placeholder="Введите количество дней"/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={style.searchForm_btn} >
                                    Войти
                                </Button>
                            </Form.Item>
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

