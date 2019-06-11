import React from 'react'
import Logo from '../Logo/Logo'
import {NavLink} from 'react-router-dom'

const HeaderUnAuthState = () => (
    <header className="header" >
        <div className="container header__container" >
            <Logo />
            <div className="header-auth-links" >
                <NavLink to="/signin" className="header-auth-links__item" >Sign In</NavLink>
                <NavLink to="/signup" className="header-auth-links__item" >Sign Up</NavLink>
            </div>
        </div>  
    </header>
)

export default HeaderUnAuthState