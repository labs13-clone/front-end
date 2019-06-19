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
        this.setSession(authResult);
      } else if (err) {
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

  setSession = (authResult) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    console.log(authResult);
    localStorage.setItem('usertoken', authResult.accessToken);

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Request the challenges or submissions from the api
    axios({
        method: 'get',
        url: `https://clone-coding-server.herokuapp.com/api/users`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(err => {
        console.log(err.message)
      });

    // Navigate to the home route
    history.replace('/');
  }

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

      } else if (err) {

        this.logoutForReal();

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

    this.logoutForReal();

  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  logoutForReal = () => {
    if (process.env.NODE_ENV === 'production') {
      this.auth0.logout({
        returnTo: 'https://clone-coding-client.herokuapp.com'
      });
    } else {
      this.auth0.logout();
    }
  }
}