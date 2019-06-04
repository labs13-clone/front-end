
import React from 'react';

import Editor from './Components/Editor/editor.js';
import LandingPage from "./Components/LandingPage/LandingPageContainer.js";
function App() {
  return (
    <div className="App">
      <LandingPage />
      <Editor/>
    </div>
  );
}

export default App;
