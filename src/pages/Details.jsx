import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailsScreen from '../components/DetailsScreen/DetailsScreen';
import Rates from '../components/Rates/Rates';

export default class Details extends Component {
  render() {
    const { match, quantidade } = this.props;
    const { id } = match.params;
    return (
      <>
        <DetailsScreen quantidade={ quantidade } id={ id } />
        <Rates id={ id } />
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  quantidade: PropTypes.func.isRequired,
};
