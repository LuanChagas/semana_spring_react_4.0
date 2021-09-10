import DashBoard from 'pages/DashBoard/Dashboard';
import Home from 'pages/Home/Home';
import React from 'react'

import { BrowserRouter, Route, Switch } from "react-router-dom"

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/dashboard" exact>
                    <DashBoard />
                </Route>
            </Switch>
        </BrowserRouter >
    )
}

export default Routes;
