import './App.css';
import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import * as Routes from './Constants/Routes'
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

function App() {
  const history = useHistory();
  const location = useLocation()
  const [firstTransition, setFirstTransition] = useState(true);

  return (
    <div className="content">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={Routes.ROUTE_ABOUT} component={() => {
            setFirstTransition(false)
            return (<About history={history} firstTransition={firstTransition} />)
          }} />
          <Route path={Routes.ROUTE_CONTACT} component={() => {
            setFirstTransition(false)
            return (<Contact history={history} firstTransition={firstTransition} />)
          }} />
          <Route path={Routes.ROUTE_HOME} component={() => {
            return (<Home history={history} firstTransition={firstTransition} />)
          }} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
