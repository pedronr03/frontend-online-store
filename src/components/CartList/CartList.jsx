import React, { Component } from 'react';
import './CartList.css';
import { Link } from 'react-router-dom';
import { getCart, updateCart, remove } from '../../services/favorite';

export default class CartList extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      decrease: -1,
      increase: 1,
    };
  }

  componentDidMount() {
    this.cartItems();
  }

  disabled = (item) => {
    const validate = item.quantidade >= item.available_quantity;
    return validate;
  }

  getPrice = () => {
    const { cart } = this.state;
    const number = cart.reduce((acc, curr) => (curr.price * curr.quantidade) + acc, 0);
    return number.toFixed(2);
  }

  removeItems = (item) => {
    remove(item);
    this.cartItems();
  }

  update = (item, value) => {
    updateCart(item, value);
    this.cartItems();
  }

  cartItems = () => {
    const cart = getCart();
    this.setState({ cart });
  }

  render() {
    const { cart, decrease, increase } = this.state;
    this.getPrice();
    return (
      <main className="cartList-main">
        <header>
          <h2>Carrinho:</h2>
        </header>
        <div className="cartList-items">
          {
            cart.length
              ? (
                cart.map((item, index) => (
                  <div className="cartList-item" key={ index }>
                    <img src={ item.thumbnail } alt={ item.title } />
                    <div>
                      <div>
                        <p data-testid="shopping-cart-product-name">{ item.title }</p>
                        <p>{ `Preço: R$ ${item.price}` }</p>
                      </div>
                      <div className="cartList-buttons">
                        <button
                          onClick={ () => this.update(item, increase) }
                          disabled={ this.disabled(item) }
                          type="button"
                          data-testid="product-increase-quantity"
                        >
                          +
                        </button>
                        <p data-testid="shopping-cart-product-quantity">
                          { item.quantidade }
                        </p>
                        <button
                          onClick={ () => this.update(item, decrease) }
                          type="button"
                          data-testid="product-decrease-quantity"
                        >
                          -
                        </button>
                        <button onClick={ () => this.removeItems(item) } type="button">
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )
              : (
                <p data-testid="shopping-cart-empty-message">
                  Seu carrinho está vazio
                </p>
              )
          }
          {
            cart.length
              ? (
                <div className="cartList-total-price">
                  <p>{`Total: ${this.getPrice()} R$`}</p>
                  <Link to="/checkout">
                    <button
                      type="button"
                      data-testid="checkout-products"
                    >
                      Comprar
                    </button>
                  </Link>
                </div>
              )
              : null
          }
        </div>
      </main>
    );
  }
}
