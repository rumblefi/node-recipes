import React from 'react'
import withGetRecipe from '../../HOC/withGetRecipe/withGetRecipe';
import Loader from '../Loader/Loader'
import Error from '../Error/Error'

const GetRecipe = ({loading,error,recipe}) => {
    if(loading) return <Loader />
    if(error) return <Error error={error.message} />
    return(
        <div>
            {recipe.name}
        </div>
    )
}

export default withGetRecipe(GetRecipe)