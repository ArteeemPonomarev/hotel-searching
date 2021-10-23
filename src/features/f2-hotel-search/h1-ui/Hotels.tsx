import React, {useCallback, useEffect} from 'react';
import 'antd/dist/antd.css';
import style from './Hotels.module.css';
import {HotelsCarousel} from "../../f3-hotelsCarousel/HotelsCarousel";
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE} from "../../../common/c2-routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../main/m2-bll/store";
import {HotelSearchForm} from "./h1-ui-components/HotelSearchForm";
import moment from 'moment';
import 'moment/locale/ru';
import {HotelCard} from "./h1-ui-components/HotelCard";
import {HotelInfo} from "../../../main/m3-dal/mainApi";
import {wordEnd} from "../../../utils/wordEnd";
import arrow from '../../../assets/icons/arrow.png';
import {Button} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import {fetchData} from '../h2-bll/hotelSearch-sagas';
import {HotelInfoDomainType} from "../h2-bll/hotel-search-reducer";
import selectUp from '../../../assets/icons/selectUp.png';


type HotelPagePropsType = {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const Hotels: React.FC<HotelPagePropsType> = ({isAuth, setIsAuth}) => {

    const location = useSelector<AppStateType, string>(state => state.hotels.location);
    const checkIn = useSelector<AppStateType, string>(state => state.hotels.checkIn);
    const checkOut = useSelector<AppStateType, string>(state => state.hotels.checkIn);
    const limit = useSelector<AppStateType, string>(state => state.hotels.limit);
    const favoritesHotels = useSelector<AppStateType, HotelInfo[]>(state => state.hotels.favoritesHotels);
    const hotels = useSelector<AppStateType, HotelInfoDomainType[]>(state => state.hotels.hotels);
    const amountOfDays = useSelector<AppStateType, string>(state => state.hotels.daysAmount);

    const dispatch = useDispatch();

    const checkInDate = moment(checkIn).format('LL');
    const checkInDateFormated = checkInDate.slice(0, checkInDate.length - 3);

    console.log(checkInDate)
    console.log(checkInDateFormated)

    // useEffect(() => {
    //     dispatch(fetchData({ location, checkIn, checkOut, limit }));
    // }, [dispatch, location, checkIn, checkOut, limit]);

    const logOutHandler = useCallback(() => {
        setIsAuth(false)
    }, [setIsAuth])

    const amountHotels = wordEnd(favoritesHotels.length, 'отел', ['ь', 'я', 'ей']);

    if (!isAuth) {
        return <Redirect to={LOGIN_PAGE}/>
    }

    return (
        <>
            <div className={style.hotels_wrapper}>
                <header className={style.hotels_header}>
                    <h1>Simple Hotel Check</h1>
                    <div>
                        <Button className={style.hotels_logout} onClick={logOutHandler}>
                            Выйти
                            {<UploadOutlined rotate={90} className={style.logout_btn_logo}/>}
                        </Button>
                    </div>
                </header>
                <div className={style.content_wrapper}>
                    <HotelSearchForm/>
                    <main className={style.hotels_content}>
                        <header className={style.hotels_content_header}>
                            <p className={style.hotel_choosen}> Отели <img src={arrow} alt="arrow"/> {location}</p>
                            <div className={style.hotel_check_in_date}>{checkInDateFormated}</div>
                        </header>
                        <HotelsCarousel/>
                        <div className={style.hotel_favorites_amount}>
                            Добавлено в Избранное: <span className={style.amount_favorities_hotels}>
                            {favoritesHotels.length} </span>
                            {amountHotels}
                        </div>
                        <div className={style.hotels_cards}>
                            {hotels.map(h => {
                                return (
                                    <div className={style.hotel_card_wrapper} key={h.hotelId}>
                                        <div className={style.hotel_logo}></div>
                                        <HotelCard
                                            hotelName={h.hotelName}
                                            price={h.priceAvg}
                                            checkInDate={checkInDate}
                                            amountDays={amountOfDays}
                                            favorite={h.favorite}
                                            stars={h.stars}
                                            hotelId={h.hotelId}/>
                                    </div>
                                )
                            })}

                        </div>
                    </main>
                    <aside className={style.hotels_favorites}>
                        <h3 className={style.favorities_title}>Избранное</h3>
                        <div className={style.selectionBlock}>
                            <div className={style.favorities_raiting}>
                                <div>Рейтинг</div>
                                <div className={style.favorities_raiting_arrows}>
                                    <div className={style.favorities_raiting_arrow}><img src={selectUp} alt="arrowUp"/>
                                    </div>
                                    <div className={style.favorities_raiting_arrow}><img className={style.selectDown}
                                                                                         src={selectUp} alt="arrowUp"/>
                                    </div>
                                </div>
                            </div>
                            <div className={style.favorities_raiting}>
                                <div>Цена</div>
                                <div className={style.favorities_raiting_arrows}>
                                    <div className={style.favorities_raiting_arrow}><img src={selectUp} alt="arrowUp"/>
                                    </div>
                                    <div className={style.favorities_raiting_arrow}><img className={style.selectDown}
                                                                                         src={selectUp} alt="arrowUp"/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <div className={style.backgroundHotels}></div>
        </>
);
};

