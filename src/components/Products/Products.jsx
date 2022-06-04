import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateCart } from '../../services/favorite';

export default class Products extends Component {
  update = (item, value) => {
    const { quantidade } = this.props;
    updateCart(item, value);
    quantidade();
  }

  render() {
    const { item } = this.props;
    return (
      <div
        data-testid="product"
        className="search-screen-product"
      >
        <div>
          <p>{ item.title }</p>
        </div>
        <img src={ item.thumbnail } alt={ item.title } />
        <div>
          <p>{`R$: ${item.price.toFixed(2)}`}</p>
          {
            item.shipping.free_shipping
              ? (
                <p data-testid="free-shipping">Frete Grátis</p>
              )
              : null
          }
        </div>
        <div>
          <Link to={ `/details/${item.id}` }>
            <button
              data-testid="product-detail-link"
              type="button"
            >
              Detalhes
            </button>
          </Link>
          <button
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => this.update(item, 1) }
          >
            Carrinho
          </button>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  quantidade: PropTypes.func.isRequired,
};
