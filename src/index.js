import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';


import App from './App';
import UserView from './Components/UserView/UserView';
import Challenges from './Components/Challenges/Challenges';

const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/userprofile" render={(props) => <UserView {...props}/>} />
            <Route path="/challenges" exact render={(props) => <Challenges {...props} />} />
            <Route path="/new/challenge" exact render={(props) => <div {...props}>Route for adding challenge</div>} />
            <Route path="/challenges/:id" render={(props) => <div {...props}>Single Challenge View</div>} />
            <Redirect to="/" />
        </Switch>
    </Router>
);


ReactDOM.render(<Root />, document.getElementById('root'));

