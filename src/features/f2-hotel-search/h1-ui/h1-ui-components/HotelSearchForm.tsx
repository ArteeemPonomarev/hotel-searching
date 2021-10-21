import React, {useCallback} from 'react';
import 'antd/dist/antd.css';
import style from "./HotelsSearchForm.module.css";
import {Button, DatePicker, Form, Input} from "antd";
import moment from "moment";

export const HotelSearchForm = () => {

    const onSubmit = useCallback((values: {
        location: string,
        checkInDate: string,
        checkOutDate: string
    }) => {
        const checkInAfterMoment = moment(values.checkInDate).format('YYYY-MM-DD');
        const checkOutDate = new Date(checkInAfterMoment);
        console.log(moment(checkOutDate.setDate(checkOutDate.getDate() + 10)).format('YYYY-MM-DD'))
        console.log('1')
    }, [])

    return (
        <aside className={style.hotels_searchFrom}>
            <Form onFinish={onSubmit} className={style.searchForm_location}>
                <Form.Item
                    name="location"
                    rules={[
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
                    <DatePicker
                        className={style.datepicker_checkIn}/>
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
                           name="checkOutDate"
                           placeholder="Введите количество дней"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={style.searchForm_btn}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </aside>
    );
};

