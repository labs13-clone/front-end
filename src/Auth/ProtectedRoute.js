import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';

export default auth => ({component: Component, ...props}) => {
    console.log(auth.isAuthenticated());
    if(auth.isAuthenticated()) {
        console.log(Component);
        return <Route {...props} render={(props) => <Component {...props} />} />

    } else {
         return <Redirect to='/' />
    }
}
