import React from 'react'
import { Route, Switch } from 'react-router'

import Layout from '../components/Layout'
import Home from '../components/Home'
import NoMatch from '../components/NoMatch'

const Routes =       
  <Layout>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </Layout>

export default Routes
