import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../../features/f1-login/l1-ui/Login';
import {Hotels} from "../../features/f2-hotel-search/h1-ui/Hotels";
import {HOTELS_PAGE, LOGIN_PAGE, PAGE_404} from "../../common/c1-routes/routes";
import {Page404} from "../../common/c2-page404/Page404";
import {useSessionStorage} from "../../cutom-hooks/useSessionStorage";


export const App = () => {

    const [isAuth, setIsAuth] = useSessionStorage('isAuth', false);

    return (
        <>
            <Switch>
                <Route path={LOGIN_PAGE} render={() => <Login isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
                <Route path={HOTELS_PAGE} exact render={() => <Hotels isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
                <Route path={PAGE_404} render={() => <Page404/>}/>
                <Redirect from={"*"} to={PAGE_404}/>
            </Switch>
        </>
    );
}


