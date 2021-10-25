import React from 'react';
import {Carousel} from "antd";
import 'antd/dist/antd.css';
import style from './HotelsCarousel.module.css';
import {useSelector} from "react-redux";
import {getImagesForCarousel} from "../../../../h2-bll/hotels-selectors";

export const HotelsCarousel = () => {
    const placesImages = useSelector(getImagesForCarousel);

    const carouselSettings = {
        autoplay: true,
        dots: false,
        slidesToShow: 3,
        infinite: true,
        speed: 500,
        draggable: true,
        swipeToSlide: true
    };

    return (
        <div className={style.carousel_wrapper}>
            <Carousel {...carouselSettings} >
                {placesImages.map(p => {
                    return (
                        <img key={p.id} className={style.carousel_img} src={p.img} alt={p.title}/>
                    )
                })}
            </Carousel>
        </div>
    );
};

