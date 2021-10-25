import React, {useCallback} from 'react';
import 'antd/dist/antd.css';
import style from "./HotelsSearchForm.module.css";
import {Button, DatePicker, Form, Input} from "antd";
import moment, {Moment} from "moment";
import {useDispatch} from "react-redux";
import {hotelsActions} from "../../../h2-bll/hotel-search-reducer";

export const HotelSearchForm = () => {

    const dispatch = useDispatch()

    const onSubmit = useCallback((values: {
        location: string,
        checkInDate: string,
        checkOutDate: string
    }) => {
        const checkInMomentFormatted = moment(values.checkInDate).format('YYYY-MM-DD');//
        const checkOutDate = new Date(checkInMomentFormatted);
        const checkOutMomentFormatted = moment(checkOutDate.setDate(checkOutDate.getDate() + 10)).format('YYYY-MM-DD');
        dispatch(hotelsActions.setUserParams(values.location, checkInMomentFormatted, values.checkOutDate, checkOutMomentFormatted));
    }, [dispatch])

    const disabledDatesHandler = (current: Moment) => {
        return moment().add(-1, 'days') >= current
    }

    return (
        <aside className={style.hotels_search_block}>
            <Form onFinish={onSubmit} className={style.search_form}>
                <div className={style.search_field_title}>Локация</div>
                <Form.Item name="location"
                           rules={[
                               {
                                   required: true,
                                   message: 'Please input city!',
                               },
                               () => ({
                                   validator(_, value) {
                                       if (!/[а-яё]+/i.test(value) || !/[a-z]+/i.test(value)) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('Please use the latin or cyrillic letters!!'));
                                   },
                               }),
                           ]}>
                    <Input className={style.search_field}
                           type="text"
                           name="location"
                           placeholder="Введите город"/>
                </Form.Item>
                <div className={style.search_field_title}>Дата заселения</div>
                <Form.Item name="checkInDate"
                           rules={[
                               {
                                   required: true,
                                   message: 'Please input check-in date!',
                               },
                           ]}>
                    <DatePicker disabledDate={disabledDatesHandler}
                                className={`${style.checkIn_datepicker} ${style.search_field}`}/>
                </Form.Item>
                <div className={style.search_field_title}>Количество дней</div>
                <Form.Item name="checkOutDate"
                           rules={[
                               {
                                   required: true,
                                   message: 'Please input days amount!',
                               },
                               () => ({
                                   validator(_, value) {
                                       if (isFinite(+value)) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('Please enter only digits!'));
                                   },
                               }),
                           ]}>
                    <Input className={style.search_field}
                           type="text"
                           name="checkOutDate"
                           placeholder="Введите количество дней"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            className={`${style.search_btn} ${style.search_field}`}>
                        Найти
                    </Button>
                </Form.Item>
            </Form>
        </aside>
    );
};

