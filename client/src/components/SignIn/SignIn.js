import React from 'react'
import './SignIn.scss'
import {Mutation} from 'react-apollo'
import {SIGNIN_USER} from '../../queries/index'
import Error from '../Error/Error'

const initialState = {
    username: '',
    password: ''
}

class SignIn extends React.Component{

    state = {...initialState}

    handleChange = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }

    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {username,password} = this.state        
        return !username || !password
    }

    handleSubmit = (event,signinUser) => {
        event.preventDefault()
        signinUser()
            .then(data => {
                console.log('signinUser', data)
                this.clearState()
            })
            .catch(error => console.error(error))
    }

    render() {

        const {username,password} = this.state

        return(
            <div className="sign-up" >
                <div className="container sign-up__container">
                    <Mutation mutation={SIGNIN_USER} variables={{username,password}} >

                        {(signinUser,{data,loading,error}) => {
                            return(
                                <form className="form" onSubmit={event => this.handleSubmit(event,signinUser)} >
                                    <h1 className="h1">Sign In</h1>
                                    <input type="text" className="form__field" placeholder="Username" name="username" onChange={this.handleChange} value={username} />
                                    <input type="password" className="form__field" placeholder="Password" name="password" onChange={this.handleChange} value={password} />
                                    <button className="button button--1 form__submit" disabled={loading || this.validateForm()} >Sign In</button>
                                    {error && <Error error={error.message} /> }
                                </form>
                            )
                        }}
                    </Mutation>
                </div>
            </div>
        )

    }

}

export default SignIn