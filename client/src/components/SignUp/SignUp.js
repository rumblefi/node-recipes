import React from 'react'
import './SignUp.scss'

class SignUp extends React.Component{

    render() {

        return(
            <div className="sign-up" >
                <div className="container sign-up__container">
                    <form className="form">
                        <h1 className="h1">Sign Up</h1>
                        <input type="text" className="form__field" placeholder="Username" name="username" />
                        <input type="text" className="form__field" placeholder="Email" name="email" />
                        <input type="password" className="form__field" placeholder="Password" name="password" />
                        <input type="password" className="form__field" placeholder="Confirm password" name="confirm_password" />
                        <button className="button button--1 form__submit">Sign Up</button>
                    </form>
                </div>
            </div>
        )

    }

}

export default SignUp