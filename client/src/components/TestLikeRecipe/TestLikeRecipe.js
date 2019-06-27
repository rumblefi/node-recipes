import React from 'react'
import withSession from '../../HOC/withSession/withSession'
import {Mutation} from 'react-apollo'
import {TEST_LIKE_RECIPE, GET_RECIPE,TEST_UNLIKE_RECIPE} from '../../queries/index'

class TestLikeRecipe extends React.Component{

    state = {
        liked: false,
        username: ''
    }

    componentDidMount() {
        if(this.props.session.getCurrentUser) {
            const {username,favorites} = this.props.session.getCurrentUser
            const {_id} = this.props
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1
            this.setState({
                liked: prevLiked,
                username
            })
        }
    }

    handleClick = async(testLikeRecipe,testUnlikeRecipe) => {
        await this.setState(prevState => ({
            liked: !prevState.liked
        }))
        await this.handleLike(testLikeRecipe,testUnlikeRecipe)
    }

    handleLike = (testLikeRecipe,testUnlikeRecipe) => {
        if(this.state.liked) {
            testLikeRecipe()
                .then( async({data}) => {
                    await this.props.refetch()
                })
                .catch(error => console.error(error))
        }
        else{
            testUnlikeRecipe()
                .then(() => console.log('unliked'))
                .catch(error => console.error(error))
        }
    }

    updateUnlike = (cache,{data: {testUnlikeRecipe}}) => {
        const {_id} = this.props
        const {getRecipe} = cache.readQuery({query: GET_RECIPE, variables: {_id}})
        cache.writeQuery({
            query: GET_RECIPE,
            variables: {_id},
            data: {
                getRecipe: {...getRecipe, likes: testUnlikeRecipe.likes - 1}
            }
        })
    }

    updateLike = (cache,{data: {testLikeRecipe}}) => {
        const {_id} = this.props
        const {getRecipe} = cache.readQuery({query: GET_RECIPE, variables: {_id}})
        cache.writeQuery({
            query: GET_RECIPE,
            variables: {_id},
            data: {
                getRecipe: {...getRecipe, likes: testLikeRecipe.likes + 1}
            }
        })
    }

    render() {

        const {username,liked} = this.state
        const {_id} = this.props

        return(
            <Mutation mutation={TEST_UNLIKE_RECIPE} variables={{_id,username}} update={this.updateUnlike} >
                {(testUnlikeRecipe) => {
                    return(
                        <Mutation mutation={TEST_LIKE_RECIPE} variables={{_id,username}} update={this.updateLike} >
                            {(testLikeRecipe) => {
                                return username && <button onClick={() => this.handleClick(testLikeRecipe,testUnlikeRecipe)}>
                                    {liked ? 'unlike' : 'Like'}
                                </button>
                            }}
                        </Mutation>
                    )
                }}
            </Mutation>
        )

    }

}

export default withSession(TestLikeRecipe)