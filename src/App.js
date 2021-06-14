import './App.css';
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home'
import About from './Pages/About'
import { useTransition, animated } from 'react-spring'
import * as Routes from './Constants/Routes'

function App() {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate3d(-100vw, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)"},
    leave: { opacity: 0, transform: "translate3d(-100vw, 0, 0)" },
    config: {mass: 1, tension: 210, friction: 20}
  })
  console.log(location);
  return (
    <div className="content">
    {transitions.map(({ item, props, key }) => (
      <animated.div key={key} style={props}>
        <Switch location={item}>
          <Route path={Routes.ROUTE_ABOUT} component={About} />
          <Route path={Routes.ROUTE_HOME} component={Home} />
        </Switch>
      </animated.div>
    ))}
    </div>
  );
}

export default App;
