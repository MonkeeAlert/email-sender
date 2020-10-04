import React, { useState  } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

export const Textarea = ({ value, id, placeholder, action }) => {
  const [val, setVal] = useState(value);
  const [isActive, setActive] = useState(false);
  
  const dispatch = useDispatch();
  
  const onChange = e => {
    dispatch(action( e.target.value ));
    setVal(e.target.value);
  }

  return(
    <label htmlFor={id} className="form__label">
      <textarea 
        id={id} 
        name={id} 
        className={`form__textarea ${isActive ? 'form__textarea--active' : ''} ${val !== '' ? 'form__textarea--not-empty' : ''}`}
        onFocus={_ => setActive(false)}
        onBlur={_ => setActive(false)}
        onChange={ e => onChange(e) }
        rows="8"
        data-test="textarea"
      />
      <span className="form__textarea-placeholder">{placeholder}</span>
      <span className="form__textarea-border"></span>
    </label>
  )
}

Textarea.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  action: PropTypes.func
};