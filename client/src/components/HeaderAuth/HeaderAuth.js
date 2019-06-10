import React from 'react'
import './HeaderAuth.scss'
import {NavLink} from 'react-router-dom'

const HeaderAuth = () => (
    <div className="header-auth" >
        <NavLink to="/sign-in" className="header-auth__item" >Sign In</NavLink>
        <NavLink to="/sign-up" className="header-auth__item" >Sign Up</NavLink>
    </div>
)

export default HeaderAuth