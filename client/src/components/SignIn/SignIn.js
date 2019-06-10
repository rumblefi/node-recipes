import React from 'react'
import './SignIn.scss'

class SignIn extends React.Component{

    render() {

        return(
            <div className="sign-in" >
                <div className="container sign-in__container">
                    <form className="form">
                        <h1 className="h1">Sign In</h1>
                        <input type="text" className="form__field" placeholder="Username" name="username" />
                        <input type="password" className="form__field" placeholder="Password" name="password" />
                        <button className="button button--1 form__submit">Sign In</button>
                    </form>
                </div>
            </div>
        )

    }

}

export default SignIn