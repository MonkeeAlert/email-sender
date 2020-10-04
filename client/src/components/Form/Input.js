import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

export const Input = ({ value, id, type, action, placeholder }) => {
  const [val, setVal] = useState(value);
  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(action( e.target.value ));
    setVal(e.target.value);
  }

  return(
    <label htmlFor={id} className="form__label">
      <input 
        id={ id } 
        name={ id } 
        type={ type }
        value={ value } 
        className={`form__input ${isActive ? 'form__input--active' : ''} ${val !== '' ? 'form__input--not-empty' : ''}`}
        onFocus={ _ => setActive(false) }
        onBlur={ _ => setActive(false) }
        onChange={ e => onChange(e) }
      />
      <span className="form__input-placeholder">{placeholder}</span>
      <span className="form__input-border"></span>
    </label>
  )
};

Input.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.func
};