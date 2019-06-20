import React from 'react'
import './Profile.scss'
import UserInfo from '../UserInfo/UserInfo'

const Profile = ({session}) => {
    return(
        <div className="container" >
            <UserInfo session={session} />
        </div>
    )
}

export default Profile