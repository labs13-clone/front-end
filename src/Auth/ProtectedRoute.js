import React from 'react';
import Header from '../Components/Layout/Header/Header';
import Footer from '../Components/Layout/Footer/Footer';
import {Route, Redirect} from 'react-router-dom';
import './ProtectedRoute.css';

export default auth => ({
    component: Component,
    ...props
}) => {

    if (auth.isAuthenticated()) {

        return <Route {...props} render={(props) => <React.Fragment>
            <Header auth={auth} />
            <div className="main-view">
                <Component {...props} auth={auth}/>
            </div>
            <Footer />
        </React.Fragment>}/>

    } else if (localStorage.getItem('isLoggedIn')) {

        return <Redirect to='/loading'/>

    } else {

        return <Redirect to='/'/>
    }
}
