import React from 'react';
import {BrowserRouter, Switch, Route } from  'react-router-dom';
import Navbar from './core/assets/components/Navbar';
import Admin from './Pages/Admin';
import Catalog from './Pages/Catalog';
import Home from './Pages/Home';
    
const Routes = () => (
    <BrowserRouter>
    <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/catalog">
                <Catalog />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>
);


export default Routes;