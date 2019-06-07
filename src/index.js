import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {withRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './Auth/Auth';
import history from './history';

import './index.css';


import App from './App';
import UserView from './Components/UserView/UserView';
import Callback from './Components/Callback/Callback';
import ProtectedRouteWithoutRouter from './Auth/ProtectedRoute';
import Challenges from './Components/Challenges/Challenges';
import AddChallenge from './Components/AddChallenge/AddChallenge';
import AttemptChallenge from './Components/AttemptChallenge/AttemptChallenge';

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
    
    return (<Router history={history}>
        <Switch>
            <Route path="/" exact render={props => <App {...props} auth={auth} />} />
            <ProtectedRoute path="/userprofile" component={UserView} />} />
            <ProtectedRoute path="/challenges" exact component={Challenges} />
            <ProtectedRoute path="/new/challenge" component={AddChallenge} />
            <ProtectedRoute path="/challenges/:id" component={AttemptChallenge} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }}/>
            <Redirect to="/" />
        </Switch>
    </Router>);
};


ReactDOM.render(<Root />, document.getElementById('root'));

