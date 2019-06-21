import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {withRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './Auth/Auth';
import history from './history';

import './index.css';

import LandingPage from './Components/Views/LandingPage/LandingPageContent';
import UserProfile from './Components/Views/UserProfile/UserProfile';
import Callback from './Auth/Callback';
import ProtectedRouteWithoutRouter from './Auth/ProtectedRoute';
import SearchChallenges from './Components/Views/SearchChallenges/SearchChallenges';
import CreateChallenge from './Components/Views/CreateChallenge/CreateChallenge';
import AttemptChallenge from './Components/Views/AttemptChallenge/AttemptChallenge';
import Leaderboard from './Components/Views/Leaderboard/Leaderboard';
import Loading from './Components/Views/Loading/Loading';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar, faTrophy} from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faTrophy)

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
    const pathName = history.location.pathname;

    //Renew auth0 session when the component is mounted
    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            auth.renewSession(pathName);
        }
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact render={_ => <LandingPage auth={auth}/>}/>
                <Route path="/loading" component={Loading}/>
                <ProtectedRoute path="/profile" component={UserProfile}/>
                <ProtectedRoute path="/challenges" exact component={SearchChallenges}/>
                <ProtectedRoute path="/create-challenge" component={CreateChallenge}/>
                <ProtectedRoute path="/challenges/:id" component={AttemptChallenge}/>
                <ProtectedRoute path="/leaderboard" component={Leaderboard}/>
                <Route
                    path="/callback"
                    render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props}/>
                }}/>
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <Root/>, document.getElementById('root'));
