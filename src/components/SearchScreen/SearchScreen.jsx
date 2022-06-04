import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SearchScreen.css';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      items: [],
      searchBar: '',
      category: '',
      searched: '',
      quantidade: props.quantidade(),
    };
  }

  componentDidMount() {
    this.categoriesList();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (name === 'category') this.setState({ searched: '' }, this.itemList);
    });
  }

  itemList = async () => {
    const { category, searched } = this.state;
    const items = await getProductsFromCategoryAndQuery(category, searched);
    this.setState({ items: items.results });
  }

  categoriesList = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  search = () => {
    const { searchBar } = this.state;
    this.setState({ searched: searchBar, searchBar: '' }, this.itemList);
  }

  update = () => {
    const { quantidade } = this.props;
    this.setState({ quantidade: quantidade() });
  }

  render() {
    const { searchBar, category, categories, items, searched, quantidade } = this.state;
    return (
      <>
        <header className="search-screen-header">
          <div>
            <h2>FRONTEND ONLINE STORE</h2>
          </div>
          <div className="search-container">
            <label htmlFor="searchBar">
              <input
                data-testid="query-input"
                id="searchBar"
                name="searchBar"
                value={ searchBar }
                type="text"
                onChange={ this.handleInput }
                placeholder="Busque aqui o seu produto"
              />
              <button onClick={ this.search } data-testid="query-button" type="button">
                Buscar
              </button>
            </label>
          </div>
          <div>
            <Link data-testid="shopping-cart-button" to="/cart">
              Carrinho
            </Link>
            <p data-testid="shopping-cart-size">{ quantidade }</p>
          </div>
        </header>
        <main className="search-screen-main">
          <div className="search-screen-side-bar">
            {
              categories.map((item, index) => (
                <Categories
                  handleInput={ this.handleInput }
                  item={ item }
                  key={ index }
                  category={ category }
                />
              ))
            }
          </div>
          <div className="search-screen-products">
            {
              !category && !searched
                ? (
                  <p data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </p>
                )
                : null
            }
            {
              items.length
                ? (
                  items.map((item, index) => (
                    <Products quantidade={ this.update } item={ item } key={ index } />
                  ))
                )
                : null
            }
            {
              searched && !items.length
                ? <p>Nenhum produto foi encontrado.</p>
                : null
            }
          </div>
        </main>
      </>
    );
  }
}

SearchScreen.propTypes = {
  quantidade: PropTypes.func.isRequired,
};
