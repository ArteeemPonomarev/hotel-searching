import React from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import style from './Login.module.css';


type LoginPropsType = {}

export const Login: React.FC<LoginPropsType> = (props: LoginPropsType) => {

    return (
        <>
            <Form
                className={style.login_form}
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

                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder="Password"
                        // iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}

                    />
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
