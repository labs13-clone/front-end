import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {withRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './Auth/Auth';
import history from './history';

import './index.css';

import LandingPage from './Components/Views/LandingPage/LandingPage';
import UserProfile from './Components/Views/UserProfile/UserProfile';
import Callback from './Auth/Callback';
import ProtectedRouteWithoutRouter from './Auth/ProtectedRoute';
import SearchChallenges from './Components/Views/SearchChallenges/SearchChallenges';
import CreateChallenge from './Components/Views/CreateChallenge/CreateChallenge';
import AttemptChallenge from './Components/Views/AttemptChallenge/AttemptChallenge';
import Leaderboard from './Components/Views/Leaderboard/Leaderboard';
import Loading from './Components/Views/Loading/Loading';
import NotFound from './Components/Views/NotFound/NotFound';

import {library, dom} from '@fortawesome/fontawesome-svg-core';
import {
    fas,
    faStar,
    faTrophy,
    faThumbsUp,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import {faGithubSquare, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import SharedModal from './Components/Shared/SharedModal/SharedModal';

library.add(fas, faStar, faTrophy, faThumbsUp, faGithubSquare, faLinkedin, faChevronDown, faChevronUp);
dom.watch()

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
    // Send the path that the user is going to into the auth workflow So the user can
    // be redirected to the proper path after authentication
    const pathName = history.location.pathname;

    // Renew auth0 session after the component mounts And if the user thinks they've
    // already logged in
    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            auth.renewSession(pathName);
        }
    }, []);

    // Throw up a modal if someone tries to access the site via a mobile device Only
    // if they aren't on the landing page (it is mobile-friendly)
    const [screenWidth,
        setScreenWidth] = useState(window.innerWidth);
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));

    useEffect(() => {
        if (window.innerWidth < 600) {
            setAppError(true);
        } else {
            setAppError(null);
        }
    }, [screenWidth]);

    const [appError,
        setAppError] = useState(null);
    function modalCallback() {
        setAppError(null);
    };

    return (
        <React.Fragment>
            <SharedModal
                class="mobile-device-modal"
                message={<div className = "mobile-device-modal-text">
                        <h1>Oh noesss!</h1><br/>
                        <h3>It looks like you're using a mobile device...</h3>
                        <p>
                            Sorry, but doing code challenges on your mobile device is not a very popular
                            thing to do, and therefore our website has not been optimized to be mobile-friendly. <br/>
                        </p> <br/>
                        Continue at your own peril!
                        <div>
                            (click anywhere)
                        </div>
                    </div>}
                modalCallback={modalCallback}
                modalState={!!appError}
            />
            <Router history={history}>
                <Switch>
                    <Route path="/" exact render={_ => <LandingPage auth={auth}/>}/>
                    <Route path="/loading" component={Loading}/>
                    <Route path="/404" component={NotFound}/>
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
                    <Redirect to="/404"/>
                </Switch>
            </Router>
        </React.Fragment>
    );
};

ReactDOM.render(
    <Root/>, document.getElementById('root'));
