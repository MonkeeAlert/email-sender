import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({value}) => {
  return(
    <header data-test="header" className="header">
      <h1 className="header__text">{value}</h1>
    </header>
  )
}

Header.propTypes = {
  value: PropTypes.string
}