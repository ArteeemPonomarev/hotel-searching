import React, {useCallback} from 'react';
import 'antd/dist/antd.css';
import style from "./HotelsSearchForm.module.css";
import {Button, ConfigProvider, DatePicker, Form, Input} from "antd";
import moment, {Moment} from "moment";

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

    const date = moment();
    console.log(date.subtract(1,'day'))

    const disabledDatesHandler = (current: Moment) => {
        return moment().add(-1, 'days')  >= current
    }

    return (
        <aside className={style.hotels_searchFrom}>
            <Form onFinish={onSubmit} className={style.searchForm_location}>
                <div className={style.searchForm_field_title}>Локация</div>
                <Form.Item
                    name="location"
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
                    ]}
                >

                    <Input className={style.searchForm_field}
                           type="text"
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
                    <div className={style.searchForm_field_title}>Дата заселения</div>

                    <DatePicker defaultValue={moment()}
                                disabledDate={disabledDatesHandler}
                                className={`${style.datepicker_checkIn} ${style.searchForm_field}`}/>

                </Form.Item>
                <div className={style.searchForm_field_title}>Количество дней</div>
                <Form.Item
                    name="checkOutDate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input amount of days!',
                        },
                        () => ({
                            validator(_, value) {
                                if (isFinite(+value)) { // проверка на число
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please enter only digit!'));
                            },
                        }),
                    ]}
                >
                    <Input className={style.searchForm_field}
                           type="text"
                           name="checkOutDate"
                           placeholder="Введите количество дней"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={`${style.searchForm_btn} ${style.searchForm_field}`}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </aside>
    );
};

