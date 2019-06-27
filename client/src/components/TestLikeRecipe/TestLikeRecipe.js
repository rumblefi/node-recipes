
import React from 'react'
import withSession from '../../HOC/withSession/withSession'
import {Mutation} from 'react-apollo'

class TestLikeRecipe extends React.Component{

    state = {
        username: ''
    }

    componentDidMount() {
        const {getCurrentUser} = this.props.session
        if(getCurrentUser) {
            this.setState({
                username: getCurrentUser.username
            })
        }
    }

    render() {

        const {username} = this.state
        const {_id} = this.props

        return(
            <Mutation mutation={TEST_LIKE_RECIPE} variables={{_id,username}} >

                {() => {
                    return username && <button>Like</button>
                }}

            </Mutation>
        )

    }

}

export default withSession(TestLikeRecipe)