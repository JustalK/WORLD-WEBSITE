import './App.css';
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home'
import About from './Pages/About'
import { useTransition, animated } from 'react-spring'
import * as Routes from './Constants/Routes'
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {mass: 1, tension: 80, friction: 80},
    trail: 200
  })
  return (
    <div className="content">
    {transitions.map(({ item, props, key }) => (
      <animated.div key={key} style={props}>
        <Switch location={item}>
          <Route path={Routes.ROUTE_ABOUT} component={About} />
          <Route path={Routes.ROUTE_HOME} component={() => (<Home history={history} />)} />
        </Switch>
      </animated.div>
    ))}
    </div>
  );
}

export default App;
