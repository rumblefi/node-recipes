import React from 'react'
import 'normalize.css'
import './App.scss'
import Header from '../Header/Header';
import Home from '../Home/Home'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import RecipePage from '../RecipePage/RecipePage'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

const App = () => {
    return(
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/recipe" component={RecipePage} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )   
}

export default App