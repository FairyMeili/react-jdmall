import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './Home';
import CategoryPage from './Category';
import ProductPage from './Product';
import ScrollListPage from './List';
import LoginPage from './Login';
import ErrorPage from './Error';
import PrivateRoute from './PrivateRoute'
import UserPage from './User'

export default class RouterPage extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/category" component={CategoryPage} />
                        <Route path="/Product" component={ProductPage} />
                        <Route path="/list" component={ScrollListPage} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/user" component={UserPage} />
                        <Route component={ErrorPage} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}
