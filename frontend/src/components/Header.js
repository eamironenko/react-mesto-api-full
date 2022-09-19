import headerLogo from '../images/Logo.svg';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header({loggedIn, userInfo, onSignOut}) {
    function exitProfile() {
        onSignOut();
    }
   return (
        <div className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            <div className="header__content">
                <Switch>
                    <Route path="/sign-in">
                        <Link to="/sign-up" className={`${!loggedIn ? 'header__link' : 'header__link_hidden'}`}>Регистрация</Link>
                    </Route>
                    <Route path="/sign-up">
                        <Link to="/sign-in" className={`${!loggedIn ? 'header__link' : 'header__link_hidden'}`}>Войти</Link>
                    </Route>
                    </Switch>
                <div className={`${loggedIn ? 'header__login-content' : 'header__login-content_hidden' }`}>
                    <p className="header__userInfo">{userInfo}</p>
                    <button className="header__exit-button" onClick={exitProfile} type="button">Выйти</button>
                </div>
            </div>
        </div>
    )
}

export default Header;