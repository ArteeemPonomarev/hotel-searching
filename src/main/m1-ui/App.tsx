import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../../features/f1-login/l1-ui/Login';
import {Hotels} from "../../features/f2-hotel-search/h1-ui/Hotels";
import {HOTELS_PAGE, LOGIN_PAGE} from "../../common/c2-routes/routes";
import {Page404} from "../../common/c3-page404/Page404";


function App() {
    return (
        <>
            <Switch>
                <Route path={LOGIN_PAGE} render={() => <Login/>}/>
                <Route path={HOTELS_PAGE} exact render={() => <Hotels/>}/>
                <Route path={"/404"} render={() => <Page404/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </>
    );
}

export default App;
