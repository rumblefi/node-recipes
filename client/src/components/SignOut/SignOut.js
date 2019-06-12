import React from 'react'
import './SignOut.scss'
import {ApolloConsumer} from 'react-apollo'
import {withRouter} from 'react-router-dom'

class SignOut extends React.Component{

    handleSignOut = (client) => {
        localStorage.removeItem('token')
        client.resetStore()
        this.props.history.push('/')
    }

    render() {

        return(
            <ApolloConsumer>
                {(client) => {
                    return <div className="sign-out" onClick={() => this.handleSignOut(client)} >Sign Out</div>
                }}
            </ApolloConsumer>
        )

    }

}

export default withRouter(SignOut)