import React from 'react'
import 'normalize.css'
import './App.scss'
import Header from '../Header/Header';
import Home from '../Home/Home'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import RecipePage from '../RecipePage/RecipePage'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql'
})

const App = () => {
    return(
        <ApolloProvider client={client} >
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/recipe" component={RecipePage} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </ApolloProvider>
    )   
}

export default App