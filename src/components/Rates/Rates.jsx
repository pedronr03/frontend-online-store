import React, { Component } from 'react';
import './Rates.css';
import PropTypes from 'prop-types';
import { setRates, getRates } from '../../services/rates';

export default class Rates extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      evaluation: '',
      nota: 'none',
      rates: [],
    };
  }

  componentDidMount() {
    this.ratesList();
  }

  ratesList = () => {
    const rates = getRates();
    const { id } = this.props;
    const newRates = rates.filter((rate) => rate.id === id);
    this.setState({ rates: newRates });
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  disabled = () => {
    const { email, nota } = this.state;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const validate = regex.test(email);
    return !(validate && nota !== 'none');
  }

  setRate = () => {
    const { email, evaluation, nota } = this.state;
    const { id } = this.props;
    const obj = { email, evaluation, nota, id };
    setRates(obj);
    this.ratesList();
    this.setState({ email: '', evaluation: '', nota: 'none' });
  }

  render() {
    const { email, evaluation, rates } = this.state;
    return (
      <main className="rates-main">
        <form>
          <div>
            <label htmlFor="rates-email">
              <input
                placeholder="Email:"
                name="email"
                value={ email }
                onChange={ this.handleInput }
                type="text"
                id="rates-email"
                data-testid="product-detail-email"
              />
            </label>
          </div>
          <div className="rates-buttons">
            Nota:
            <button
              type="button"
              name="nota"
              onClick={ this.handleInput }
              value="1"
              data-testid="1-rating"
            >
              1
            </button>
            <button
              type="button"
              name="nota"
              onClick={ this.handleInput }
              value="2"
              data-testid="2-rating"
            >
              2
            </button>
            <button
              type="button"
              name="nota"
              onClick={ this.handleInput }
              value="3"
              data-testid="3-rating"
            >
              3
            </button>
            <button
              type="button"
              name="nota"
              onClick={ this.handleInput }
              value="4"
              data-testid="4-rating"
            >
              4
            </button>
            <button
              type="button"
              name="nota"
              onClick={ this.handleInput }
              value="5"
              data-testid="5-rating"
            >
              5
            </button>
          </div>
          <div>
            <label htmlFor="evaluation">
              <textarea
                value={ evaluation }
                placeholder="Avaliação:"
                name="evaluation"
                id="evaluation"
                cols="30"
                rows="5"
                onChange={ this.handleInput }
                data-testid="product-detail-evaluation"
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              disabled={ this.disabled() }
              data-testid="submit-review-btn"
              onClick={ this.setRate }
            >
              Enviar
            </button>
          </div>
        </form>
        <div className="all-rates">
          <h3>Avaliações dos usuários:</h3>
          <div>
            {
              rates.length
                ? (
                  rates.map((rate, index) => (
                    <div className="rates-item" key={ index }>
                      <p>{ rate.email }</p>
                      <p>{`Nota: ${rate.nota}`}</p>
                      <p>{ rate.evaluation }</p>
                    </div>
                  ))
                )
                : (
                  <p>Nenhuma avaliação foi feita para este produto ainda. :(</p>
                )
            }
          </div>
        </div>
      </main>
    );
  }
}

Rates.propTypes = {
  id: PropTypes.string.isRequired,
};
