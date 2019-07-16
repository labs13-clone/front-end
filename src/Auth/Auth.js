import history from '../history';
import auth0 from 'auth0-js';
import {
  AUTH_CONFIG
} from './auth0-variables';
import axios from 'axios';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  user;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.audience,
    responseType: 'id_token token',
    scope: 'openid profile'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        //Set session
        this.setSession(authResult);
      }

      //Else go home
      //If there's an error alert user
      else if (err) {
        history.replace('/');
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken = () => {
    return this.accessToken;
  }

  getIdToken = () => {
    return this.idToken;
  }

  getUser = () => {
    return this.user;
  }

  setSession = (authResult, path) => {

    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    if (process.env.NODE_ENV !== 'production') console.log('Your auth0 access token', this.accessToken);

    // Request the user information from the backend
    this.getUserInfo();

    /*

    Route the user to the route they were headed to before needing authorization or reloading the page
    path is set in index.js when the Root component mounts
    path is forwarded into the Auth module via renewSession then setSession

    */

    //Most of the time after going through the auth0 lock screen from the landing page
    //The path will be "/callback" so we navigate to the challenges page
    if (path === "/callback" ||
      // || (path=== undefined && localStorage.getItem('isLoggedIn')) was added to stop occasional bug
      // When you clicked on the call to action on landing page you would sometimes be redirected back to landing
      // Even after successful authorization. Turns out path was occasionally undefined.
      (path === undefined && localStorage.getItem('isLoggedIn'))) {
      history.replace(`/challenges`);
    } else {
      history.replace(`${path}`);
    }

  }

  renewSession = (path) => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {

        //Set session
        this.setSession(authResult, path);

      } else if (err) {
        localStorage.clear()
        //this.logoutForReal();
        this.auth0.logout({
          returnTo: AUTH_CONFIG.returnTo
        });

        //Todo: Possible bug?
        //Occasionally, we were getting this alert endlessly
        //So we added localStorage.clear();
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.user = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: AUTH_CONFIG.returnTo
    });
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time

    const expiresAt = this.expiresAt;

    return (new Date().getTime() < expiresAt);
  }

  logoutForReal = () => {
    if (process.env.NODE_ENV === 'production') {
      this.auth0.logout({
        returnTo: 'https://challengejs.com'
      });
    } else {
      this.auth0.logout();
    }
  }

  getUserInfo = () => {
    axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVER}/api/users`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
      .then(response => {
        //Set auth0 user profile
        this.user = response.data;
      })
      .catch(err => {
        console.log(err.message)
      });
  }
}