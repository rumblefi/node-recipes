import React from 'react'
import {Link} from 'react-router-dom'

const UserInfo = ({session:{getCurrentUser}}) => {
    console.log('fuck', getCurrentUser)
    return(
        <div className="user-info" >
            <div>Username: <b>{getCurrentUser.username}</b></div>
            <div>Email: <b>{getCurrentUser.email}</b></div>
            <div>
                <h1>Your favorite recipes</h1>
                <ul>
                    {getCurrentUser.favorites.map(recipe => 
                        <li key={recipe._id} >
                            <Link to={`/recipe/${recipe._id}`} >
                                {recipe.name}
                            </Link>
                        </li>
                    )}
                </ul>
                {!getCurrentUser.favorites.length && <p>No favorites</p> }
            </div>
        </div>
    )
}

export default UserInfo