import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchScreen from '../components/SearchScreen/SearchScreen';

export default class Home extends Component {
  render() {
    const { quantidade } = this.props;
    return (
      <SearchScreen quantidade={ quantidade } />
    );
  }
}

Home.propTypes = {
  quantidade: PropTypes.func.isRequired,
};
