import React from 'react'
import Logo from '../Logo/Logo'
import Menu from '../Menu/Menu';
import HeaderUser from '../HeaderUser/HeaderUser'
import SignOut from '../SignOut/SignOut'

const HeaderAuthState = ({session}) => (
    <header className="header">
        <div className="container header__container" >
            <Logo />
            <Menu />
            <div className="header__right" >
                <HeaderUser session={session} />
                <SignOut />
            </div>
        </div>  
    </header>    
)

export default HeaderAuthState