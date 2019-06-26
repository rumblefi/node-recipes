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

class Like extends React.Component{

    // render() {
    //     const {count,session:{getCurrentUser}} = this.props
    //     if(getCurrentUser) return <LikeAuth count={count} />
    //     return <LikeUnAuth count={count} />
    // }

    render() {

        const {count} = this.props

        return(
            <div className="like" >
                <div className="like__heart"></div>    
                <div className="like__counter">{count}</div>
            </div>
        )

    }

}

export default Like