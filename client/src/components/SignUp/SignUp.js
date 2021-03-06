import React from 'react'
import './SignUp.scss'
import {Mutation} from 'react-apollo'
import {SIGNUP_USER} from '../../queries/index'
import Error from '../Error/Error'
import {withRouter} from 'react-router-dom'
import withUnAuth from '../../HOC/withUnAuth/withUnAuth'

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

class SignUp extends React.Component{

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
        const {username,email,password,passwordConfirmation} = this.state        
        return !username || !email || !password || !passwordConfirmation || password !== passwordConfirmation
    }

    handleSubmit = (event,signupUser) => {
        event.preventDefault()
        signupUser()
            .then( async (data) => {
                await this.props.refetch()
                this.clearState()
                this.props.history.push('/signin')
            })
            .catch(error => console.error(error))
    }

    render() {

        const {username,email,password,passwordConfirmation} = this.state

        return(
            <div className="sign-up" >
                <div className="container sign-up__container">
                    <Mutation mutation={SIGNUP_USER} variables={{username,email,password}} >

                        {(signupUser,{data,loading,error}) => {
                            return(
                                <form className="form" onSubmit={event => this.handleSubmit(event,signupUser)} >
                                    <h1 className="h1">Sign Up</h1>
                                    <input type="text" className="form__field" placeholder="Username" name="username" onChange={this.handleChange} value={username} />
                                    <input type="email" className="form__field" placeholder="Email" name="email" onChange={this.handleChange} value={email} />
                                    <input type="password" className="form__field" placeholder="Password" name="password" onChange={this.handleChange} value={password} />
                                    <input type="password" className="form__field" placeholder="Confirm password" name="passwordConfirmation" onChange={this.handleChange} value={passwordConfirmation} />
                                    <button className="button button--1 form__submit" disabled={loading || this.validateForm()} >Sign Up</button>
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

export default withUnAuth(withRouter(SignUp))