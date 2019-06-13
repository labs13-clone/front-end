
import React from 'react';

import LandingPage from './Components/Views/LandingPage/LandingPageContent';
import SearchChallenges from './Components/Views/SearchChallenges/SearchChallenges';

function App(props) {

  //Is the user authenticated?
  const { isAuthenticated } = props.auth;

  return (
    <div className="App">
      {!isAuthenticated() && <LandingPage {...props} />}
      {isAuthenticated() && <SearchChallenges {...props}/>}
    </div>
  );
}

export default App;
