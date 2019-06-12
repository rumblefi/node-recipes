import React from 'react'
import './Like.scss'

const Like = ({count}) => (
    <div className="like" >
        <div className="like__heart"></div>    
        <div className="like__counter">{count}</div>
    </div>
)

export default Like