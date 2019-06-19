import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {withRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './Auth/Auth';
import history from './history';


import './index.css';

import App from './App';
import UserProfile from './Components/Views/UserProfile/UserProfile';
import Callback from './Auth/Callback';
import ProtectedRouteWithoutRouter from './Auth/ProtectedRoute';
import SearchChallenges from './Components/Views/SearchChallenges/SearchChallenges';
import CreateChallenge from './Components/Views/CreateChallenge/CreateChallenge';
import AttemptChallenge from './Components/Views/AttemptChallenge/AttemptChallenge';
import Leaderboard from './Components/Views/Leaderboard/Leaderboard';
import Footer from './Components/Layout/Footer/Footer';
import Header from './Components/Layout/Header/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faStar)

const auth = new Auth();

//Handle callback after login/register
const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

//Give ProtectedRoute component access to history
const ProtectedRouteWithAuthWithoutRouter = ProtectedRouteWithoutRouter(auth);
const ProtectedRoute = withRouter(ProtectedRouteWithAuthWithoutRouter);

const Root = () => {

    

    //Renew auth0 session when the component is mounted
    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            auth.renewSession();
        }
    }, []);
    
    return (<div>        
        <Router history={history}>
            <Header auth={auth}/>
            <div className="main-view">
            <Switch>
                <Route path="/" exact render={_ => <App auth={auth} />} />
                <ProtectedRoute path="/userprofile" component={UserProfile} />} />
                <ProtectedRoute path="/challenges" exact component={SearchChallenges} />
                <ProtectedRoute path="/new/challenge" component={CreateChallenge} />
                <ProtectedRoute path="/challenges/:id" component={AttemptChallenge} />
                <ProtectedRoute path="/leaderboard" component={Leaderboard} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
                <Redirect to="/" />
            </Switch>
            </div>
            <Footer/>
        </Router>
    </div>);
};


ReactDOM.render(<Root />, document.getElementById('root'));

