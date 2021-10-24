import React from 'react';
import {Button} from "antd";
import 'antd/dist/antd.css';
import style from './Page404.module.css';
import {Link} from 'react-router-dom';

export const Page404 = () => {
    return (
        <div className={style.not_found_page}>
            <p>404 error. Not found page!</p>
            <div>
                <Link to={''}>
                    <Button type='primary'>Вернуться на страницу выбора отеля!</Button>
                </Link>
            </div>
        </div>
    );
};

