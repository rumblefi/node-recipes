import React from 'react'
import './HeaderUser.scss'
import anonMaleImg from '../../img/icons/anon-male.svg'
import anonFemaleImg from '../../img/icons/anon-female.svg'
import {Link} from 'react-router-dom'

const HeaderUser = ({session}) => (
    <Link to="/cabinet" className="header-user" >
        <img src={anonMaleImg} className="header-user__img" />
        <div className="header-user__name">{session.getCurrentUser.username}</div>
    </Link>
)

export default HeaderUser