import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './Home';
import CategoryPage from './Category';
import LoginPage from './Login';
import ErrorPage from './404';

export default class RouterPage extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/category" component={CategoryPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route component={ErrorPage} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}
