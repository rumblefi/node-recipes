import React from 'react'
import './Profile.scss'
import UserInfo from '../UserInfo/UserInfo'
import UserRecipes from '../UserRecipes/UserRecipes'
import withAuth from '../../HOC/withAuth/withAuth'

const Profile = ({session}) => {
    return(
        <div className="container" >
            <UserInfo session={session} />
            <UserRecipes session={session} />
        </div>
    )
}

export default withAuth(Profile)