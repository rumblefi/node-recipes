import React from 'react'
import 'normalize.css'
import './App.scss'
import Header from '../Header/Header';
import Home from '../Home/Home'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import RecipePage from '../RecipePage/RecipePage'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import withSession from '../../HOC/withSession/withSession'
import AddRecipe from '../AddRecipe/AddRecipe'
import Profile from '../Profile/Profile'
import EditRecipe from '../EditRecipe/EditRecipe'

const App = ({refetch,session}) => {
    return(
        <Router>
            <Header session={session} />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/recipe/:_id" component={RecipePage} />
                <Route path="/signin" render={() => <SignIn refetch={refetch}/>} />
                <Route path="/signup" render={() => <SignUp refetch={refetch}/>} />
                <Route path="/add-recipe" render={() => <AddRecipe session={session} /> } />
                <Route path="/edit-recipe/:_id" component={EditRecipe} />
                <Route path="/profile" component={Profile}/>
                <Redirect to="/" />
            </Switch>
        </Router>
    )   
}

export default withSession(App)