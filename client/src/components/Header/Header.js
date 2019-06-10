import React from 'react'
import './Header.scss'
import Logo from '../Logo/Logo';
import HeaderAuth from '../HeaderAuth/HeaderAuth';
import SignOut from '../SignOut/SignOut'
import Menu from '../Menu/Menu';

const Header = () => {
    return <HeaderUnauthState />
}

const HeaderUnauthState = () => (
    <header className="header" >
        <div className="container header__container" >
            <Logo />
            <HeaderAuth />
        </div>  
    </header>
)

const HeaderAuthState = () => (
    <header className="header" style={{borderTop: '1px solid black'}} >
        <div className="container header__container" >
            <Logo />
            <Menu />
            <SignOut />
        </div>  
    </header>    
)

export default Header