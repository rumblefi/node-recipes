import React from 'react'
import './Header.scss'
import HeaderAuthState from '../HeaderAuthState/HeaderAuthState'
import HeaderUnAuthState from '../HeaderUnAuthState/HeaderUnAuthState'

const Header = ({session}) => {
    if(session.getCurrentUser) return <HeaderAuthState session={session} />
    return <HeaderUnAuthState />
}

export default Header