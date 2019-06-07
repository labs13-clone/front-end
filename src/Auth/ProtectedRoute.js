import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';

export default auth => ({component: Component, ...props}) => {
    
    if(auth.isAuthenticated()) {
        
        return <Route {...props} render={(props) => <Component {...props} />} />

    } else {
         return <Redirect to='/' />
    }
}
