import React from 'react';
import Auth from './Auth';
const auth = new Auth();

export default props => Component => {
    if(auth.isAuthenticated()) {
        return <Component {...props}/>;
    } else {
        props.history.push('/');
    }
}