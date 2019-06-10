import React from 'react'
import './Logo.scss'
import {NavLink} from 'react-router-dom'

const Logo = () => (
    <NavLink to="/" exact className="logo">Recipe Box</NavLink>
)

export default Logo