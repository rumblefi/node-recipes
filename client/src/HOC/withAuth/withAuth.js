import React from 'react'
import {Query} from 'react-apollo'
import {GET_CURRENT_USER} from '../../queries/index'
import {Redirect} from 'react-router-dom'
import Error from '../../components/Error/Error'

const withAuth = (Component) => props => {
    return(
        <Query query={GET_CURRENT_USER} >
            {({data,loading,error}) => {
                if(loading) return null
                if(error) return <Error error={error.message} />
                if(!data.getCurrentUser) return(
                    <Redirect to="/" />
                )
                return(
                    <Component {...props} />
                )
            }}
        </Query>
    )
}

export default withAuth