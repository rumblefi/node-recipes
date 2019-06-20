import React from 'react'
import './Like.scss'

const LikeUnAuth = ({count}) => {
    return(
        <div className="like" style={{display:'block'}} >
            <span className="like__title">Likes</span>
            <span className="like__counter"> {count}</span>
        </div>
    )
}

const LikeAuth = ({count}) => {
    return(
        <div className="like" >
            <div className="like__heart"></div>    
            <div className="like__counter">{count}</div>
        </div>
    )
}

const Like = ({count,session:{getCurrentUser}}) => {
    console.log('session', getCurrentUser)
    if(getCurrentUser) return <LikeAuth count={count} />
    return <LikeUnAuth count={count} />
}

export default Like