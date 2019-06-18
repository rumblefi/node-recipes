import React from 'react'
import {Query} from 'react-apollo'
import {GET_RECIPE} from '../../queries/index'

const withGetRecipe = (Component) => props => {

    const {_id} = props.match.params

    return(
        <Query query={GET_RECIPE} variables={{_id}} >

            {({data: {getRecipe},loading,error}) => {
                if(loading) console.log('loading')
                if(error) console.log(error)
                return <Component {...props} recipe={getRecipe} loading={loading} error={error} />
            }}

        </Query>
    )

}

export default withGetRecipe