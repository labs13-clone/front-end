
import React from 'react';

import Editor from './Components/Editor/editor';
import LandingPage from './Components/LandingPage/LandingPageContent';
import Header from './Components/Header/Header';

function App(props) {

  //Is the user authenticated?
  const { isAuthenticated } = props.auth;

  return (
    <div className="App">
      {!isAuthenticated() && <LandingPage {...props} />}
      {isAuthenticated() && <React.Fragment><Header {...props}/><Editor/></React.Fragment>}
    </div>
  );
}

export default App;
