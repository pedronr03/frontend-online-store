import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Details from './pages/Details';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { getCart } from './services/favorite';

export default class App extends Component {
  quantidade = () => {
    const cart = getCart();
    const qtd = cart.reduce((acc, curr) => curr.quantidade + acc, 0);
    return qtd;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/details/:id"
            render={ (props) => <Details { ...props } quantidade={ this.quantidade } /> }
          />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/cart" component={ Cart } />
          <Route
            exact
            path="/"
            render={ (props) => <Home { ...props } quantidade={ this.quantidade } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
