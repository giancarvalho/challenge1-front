import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './assets/styles/global.css';
import './assets/styles/reset.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"><Home /></Route>
      </Switch>
    </Router>
  );
}

export default App;
