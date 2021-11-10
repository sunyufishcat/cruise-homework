import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DashBoard from './pages/DashBoard/DashBoard';
import Agent from './pages/Agent/Agent';
import MyCruise from './pages/MyCruise/MyCruise';
import Help from './pages/Help/Help';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route component={Agent} path="/agent" />
          <Route component={DashBoard} path="/index" />
          <Route component={Help} path="/help" />
          <Route component={MyCruise} path="/myCruise" />
          <Redirect from="/" to="/index" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
