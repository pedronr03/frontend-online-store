import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Categories extends Component {
  render() {
    const { item, handleInput, category } = this.props;
    return (
      <div>
        <button
          type="button"
          name="category"
          value={ item.id }
          onClick={ handleInput }
          data-testid="category"
          className={ category === item.id && 'categorySelected' }
        >
          { item.name }
        </button>
      </div>
    );
  }
}

Categories.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};
