import React from 'react';
import {Carousel} from "antd";
import 'antd/dist/antd.css';
import style from './HotelsCarousel.module.css';

import hotel1 from '../../assets/forestImages/forestImg1.png';
import hotel2 from '../../assets/forestImages/forestImg2.png';
import hotel3 from '../../assets/forestImages/forestImg3.png';
import hotel4 from '../../assets/forestImages/forestImg2.png';

export const HotelsCarousel = () => {

    const carouselSettings = {
        autoplay: true,
        dots: false,
        slidesToShow: 3,
        infinite: true,
        speed: 500,
        draggable: true,
        swipeToSlide: true
    }

    return (
        <div className={style.carousel_hotels_wrapper}>
            <Carousel {...carouselSettings} >

                {/*занести в глобальный стейт и переписать на map*/}

                <img className={style.carousel_hotel} src={hotel1}/>
                <img className={style.carousel_hotel} src={hotel2}/>
                <img className={style.carousel_hotel} src={hotel3}/>
                <img className={style.carousel_hotel} src={hotel4}/>
            </Carousel>
        </div>
    );
};

