import React, { useCallback } from 'react';
import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import style from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../main/m2-bll/store";
import {HOTELS_PAGE} from "../../../common/c2-routes/routes";
import {Redirect} from 'react-router-dom';
import {authActions} from "../l2-bll/login-reducer";


type LoginPropsType = {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const Login: React.FC<LoginPropsType> = ({isAuth, setIsAuth}) => {

    const dispatch = useDispatch();

    const onSubmit = useCallback((values: {
        email: string,
        password: string
    }) => {
        dispatch(authActions.setUserData({...values, isLoggedIn: true}))
        setIsAuth(true)
    }, [setIsAuth])

    if (isAuth) {
        return <Redirect to={HOTELS_PAGE}/>;
    }

    return (
        <>
            <Form
                className={style.login_form}
                onFinish={onSubmit}
            >
                <span className={style.login_form_title}>Simple Hotel Check</span>
                <Form.Item
                    className={style.form_item}
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined/>}
                           type="email"
                           name="email"
                           placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    className={style.form_item}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        {
                            min: 8,
                            message: 'Must be more than  8 characters!',
                        },
                        () => ({
                            validator(_, value) {
                                if (!/[а-яё]+/i.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please use the latin letters!!'));
                            },
                        }),

                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder="Password"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={style.login_form_btn}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
            <div className={style.backgroundColor}></div>
            <div className={style.background}></div>
        </>
    )
};
