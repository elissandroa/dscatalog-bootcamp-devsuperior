import React from 'react';
import {BrowserRouter, Switch, Route, Redirect } from  'react-router-dom';
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
            <Redirect from ="/admin" to="/admin/products" exact/>
            <Route path="/admin">
                <Redirect to="/admin/products" />
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>
);


export default Routes;