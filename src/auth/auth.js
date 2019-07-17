import axios from 'axios';
import objToQuery from '../Utility/objToQuery';

class Auth {

    domain = process.env.REACT_APP_DOMAIN;
    clientId = process.env.REACT_APP_CLIENT_ID;
    callbackUrl = process.env.REACT_APP_CALLBACK_URL;
    backend = process.REACT_APP_BACKEND;
    user = null;
    token = null;

    //Checks that a user's session is valid
    checkSession = () => {

        if (this.token) {

        } else {
            //Check cookie

        }
    }

    //Forwards a user to GitHub to authorize the application's access to their identity
    //Returns a temporary code as well as the unique key provided to protect against cross-site request forgery attacks
    login = () => {

        //Get a random unguessable string from the backend
        axios.get(`${this.backend}/auth/init`)
        .then(({state})=> {

            //Construct query param string
            const queryParamString = objToQuery({
                clientId: this.clientId,
                callbackUrl: this.callbackUrl,
                state
            });
    
            //Send user to Github to authorize the app
            window.location.href = `https://github.com/login/oauth/authorize${queryParamString}`;
        })
        .catch(_ => {
            //Send user to internal server error page
            window.location.href = `${this.domain}/500`;
        });
    }

    //By refreshing the page to the root domain:
    //1. The user's token will be reset in state
    //2. The user will be sent to the landing page
    logout = () => {
        window.location.href = this.domain;
    }
}

export default Auth;