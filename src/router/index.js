import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from '../containers/Layouts/Main'
import Home from '../containers/Views/Main/Home'
import Thanks from '../containers/Views/Main/Thanks'


const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route>
          <Main>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/thanks' component={Thanks} />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRoute
