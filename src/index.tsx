import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './main/m1-ui/App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./main/m2-bll/store";
import moment from 'moment';
import {ConfigProvider} from "antd";
import ru_RU from "antd/lib/locale/ru_RU";

moment.locale('ru')

ReactDOM.render(
    <ConfigProvider locale={ru_RU}>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
