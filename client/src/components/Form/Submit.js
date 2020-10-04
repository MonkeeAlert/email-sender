import React from 'react';
import PropTypes from 'prop-types';

export const Submit = ({ value }) => {
  return(
    <input 
      id="submit" 
      name="submit" 
      type="submit"
      className="form__submit"
      value={value}
    />
  )
}

Submit.propTypes = {
  value: PropTypes.string
};