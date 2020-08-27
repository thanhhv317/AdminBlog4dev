import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PageRouter from './router'

function App() {
  return (
    <div className="App">
      <Router>

        <PageRouter/>
        
       
      </Router>
    </div>
  );
}

export default App;
