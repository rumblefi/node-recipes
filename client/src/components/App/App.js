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
import UpdateRecipe from '../UpdateRecipe/UpdateRecipe';

const App = ({refetch,session}) => {
    return(
        <Router>
            <Header session={session} />
            <Switch>
                <Route path="/" exact render={() => <Home session={session} />} />
                <Route path="/recipe/:_id" render={() => <RecipePage session={session} />} />
                <Route path="/signin" render={() => <SignIn refetch={refetch}/>} />
                <Route path="/signup" render={() => <SignUp refetch={refetch}/>} />
                <Route path="/add-recipe" render={() => <AddRecipe session={session} /> } />
                <Route path="/update-recipe/:_id" render={() => <UpdateRecipe refetch={refetch}/> } />
                <Route path="/profile" render={() => <Profile session={session} refetch={refetch} />}/>
                <Redirect to="/" />
            </Switch>
        </Router>
    )   
}

export default withSession(App)