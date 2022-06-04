import React, { Component } from 'react';
import './CheckoutScreen.css';
import { Link } from 'react-router-dom';
import { getCart } from '../../services/favorite';

export default class CheckoutScreen extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.cart();
  }

  cart = () => {
    const cart = getCart();
    this.setState({ cart });
  }

  getPrice = () => {
    const { cart } = this.state;
    const number = cart.reduce((acc, curr) => (curr.price * curr.quantidade) + acc, 0);
    return number.toFixed(2);
  }

  render() {
    const { cart } = this.state;
    return (
      <main className="checkout-screen-main">
        <header>
          <h2>Checkout:</h2>
        </header>
        <div className="checkout-items">
          <div>
            <h3>Revise seus produtos:</h3>
          </div>
          <div>
            {
              cart.map((item, index) => (
                <div className="checkout-item" key={ index }>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <div>
                    <p>{ item.title }</p>
                    <p>{ `Quantidade: ${item.quantidade}` }</p>
                    <p>{ `Preço: ${(item.price * item.quantidade).toFixed(2)}` }</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div>
            <h4>{`Total: ${this.getPrice()}`}</h4>
          </div>
        </div>
        <form>
          <div>
            <h3>Preencha seus dados:</h3>
          </div>
          <div>
            <label htmlFor="fullname">
              <input
                type="text"
                placeholder="Nome Completo"
                id="fullname"
                data-testid="checkout-fullname"
              />
            </label>
            <label htmlFor="email">
              <input
                type="text"
                placeholder="Email"
                id="email"
                data-testid="checkout-email"
              />
            </label>
            <label htmlFor="cpf">
              <input
                type="text"
                placeholder="CPF"
                id="cpf"
                data-testid="checkout-cpf"
              />
            </label>
            <label htmlFor="phone">
              <input
                type="text"
                placeholder="Telefone"
                id="phone"
                data-testid="checkout-phone"
              />
            </label>
          </div>
          <div>
            <label htmlFor="cep">
              <input
                type="text"
                placeholder="CEP"
                id="cep"
                data-testid="checkout-cep"
              />
            </label>
            <label htmlFor="address">
              <input
                type="text"
                placeholder="Endereço"
                id="address"
                data-testid="checkout-address"
              />
            </label>
          </div>
          <div>
            <label htmlFor="complemento">
              <input
                type="text"
                placeholder="Complemento"
                id="complemento"
              />
            </label>
            <label htmlFor="numero">
              <input
                type="text"
                placeholder="Número"
                id="numero"
              />
            </label>
            <label htmlFor="cidade">
              <input
                type="text"
                placeholder="Cidade"
                id="cidade"
              />
            </label>
            <label htmlFor="estado">
              <input
                type="text"
                placeholder="Estado"
                id="estado"
              />
            </label>
          </div>
          <div>
            <Link to="/confirmation">
              <button type="button">Finalizar</button>
            </Link>
          </div>
        </form>
      </main>
    );
  }
}
