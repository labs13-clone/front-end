import React from 'react';
import Header from '../Components/Layout/Header/Header';
import {Route, Redirect} from 'react-router-dom';

export default auth => ({
    component: Component,
    ...props
}) => {

    if (auth.isAuthenticated()) {

        return <Route {...props} render={(props) => <React.Fragment>
            <Header auth={auth}></Header>
            <Component {...props} auth={auth}/>
        </React.Fragment>}/>

    } else if (localStorage.getItem('isLoggedIn')) {

        return <Redirect to='/loading'/>

    } else {

        return <Redirect to='/'/>
    }
}
