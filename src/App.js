import './App.css';
import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home'
import { useTransition, animated } from 'react-spring'

function App() {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 1 },
    enter: { opacity: 1},
    leave: { opacity: 0 },
    mass: 1,
    tension: 210,
    friction: 20
  })

  return (
    <div className="content">
    {transitions.map(({ item, props, key }) => (
      <animated.div key={key} style={props}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </animated.div>
    ))}
    </div>
  );
}

export default App;
