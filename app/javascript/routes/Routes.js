import React from "react"
import { Route, Switch } from "react-router"

import Layout from "../pages/Layout"
import Home from "../pages/Home"
import Styleguide from "../pages/Styleguide"
import NoMatch from "../pages/NoMatch"

const Routes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </Layout>
)

export default Routes
