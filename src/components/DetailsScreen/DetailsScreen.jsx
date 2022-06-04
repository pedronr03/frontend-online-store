import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './DetailsScreen.css';
import { Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { updateCart } from '../../services/favorite';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantidade: props.quantidade(),
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { id } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  }

  update = (item, value) => {
    const { quantidade } = this.props;
    updateCart(item, value);
    this.setState({ quantidade: quantidade() });
  }

  render() {
    const { product, quantidade } = this.state;
    return (
      <>
        <header className="details-screen-header">
          <div>
            <h2>FRONTEND ONLINE STORE</h2>
          </div>
          <div>
            <Link data-testid="shopping-cart-button" to="/cart">
              Carrinho
            </Link>
            <p data-testid="shopping-cart-size">
              {
                quantidade
              }
            </p>
          </div>
        </header>
        <main className="details-screen-main">
          {
            product
              ? (
                <div className="details-screen-details">
                  <h3 data-testid="product-detail-name">{ product.title }</h3>
                  <p>{ `R$ ${product.price.toFixed(2)}` }</p>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <button
                    onClick={ () => this.update(product, 1) }
                    data-testid="product-detail-add-to-cart"
                    type="button"
                  >
                    Carrinho
                  </button>
                </div>
              )
              : null
          }
        </main>
      </>

    );
  }
}

DetailsScreen.propTypes = {
  id: PropTypes.string.isRequired,
  quantidade: PropTypes.func.isRequired,
};
