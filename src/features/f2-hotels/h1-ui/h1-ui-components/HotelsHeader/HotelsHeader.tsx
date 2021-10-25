import React from 'react';
import style from './HotelsHeader.module.css';
import {Button} from "antd";
import {UploadOutlined} from "@ant-design/icons";

type HotelsHeaderPropsType = {
    logOutHandler: () => void
}

export const HotelsHeader: React.FC<HotelsHeaderPropsType> = React.memo(({logOutHandler}) => {
    return (
        <header className={style.hotels_header}>
            <h1 className={style.hotels_header_title}>Simple Hotel Check</h1>
            <div>
                <Button className={style.hotels_logout_btn} onClick={logOutHandler}>
                    Выйти
                    {<UploadOutlined rotate={90} className={style.logout_logo}/>}
                </Button>
            </div>
        </header>
    );
})

