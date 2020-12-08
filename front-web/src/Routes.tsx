import React from 'react';
import {BrowserRouter, Switch, Route } from  'react-router-dom';
import Navbar from './core/assets/components/Navbar';
import Admin from './Pages/Admin';
import Catalog from './Pages/Catalog';
import ProductDetails from './Pages/Catalog/components/ProductDetails';
import Home from './Pages/Home';
    
const Routes = () => (
    <BrowserRouter>
    <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalog />
            </Route>
            <Route path="/products/:productId">
                <ProductDetails />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>
);


export default Routes;