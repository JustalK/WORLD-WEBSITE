import './App.css';
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home'
import About from './Pages/About'
import * as Routes from './Constants/Routes'
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

function App() {
  const history = useHistory();
  const location = useLocation()

  return (
    <div className="content">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={Routes.ROUTE_ABOUT} component={About} />
          <Route path={Routes.ROUTE_HOME} component={() => (<Home history={history} />)} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
