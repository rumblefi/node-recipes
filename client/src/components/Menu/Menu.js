import React from 'react'
import './Menu.scss'
import {NavLink} from 'react-router-dom'

const Menu = () => (
    <ul className="menu" >
        <li className="menu__item">
            <NavLink to="/add-recipe" className="menu__link">Add Recipe</NavLink>
        </li>
    </ul>
)

export default Menu