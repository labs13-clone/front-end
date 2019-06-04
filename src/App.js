
import React from 'react';

import Editor from './components/editor.js';
import LandingPage from "./components/LandingPage/LandingPageContainer.js";
function App() {
  return (
    <div className="App">
      <LandingPage />
      <Editor/>
    </div>
  );
}

export default App;
