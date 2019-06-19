import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default auth => ({
    component: Component,
    ...props
}) => {

    if (auth.isAuthenticated()) {

        return <Route {...props} render={(props) => <Component {...props} auth={auth}/>}/>

    } else if (localStorage.getItem('isLoggedIn')) {
        return <Redirect to='/loading'/>
    } else {
        return <Redirect to='/'/>
    }
}
