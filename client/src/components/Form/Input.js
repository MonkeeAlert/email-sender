import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export const Input = props => {
  const [value, setValue] = useState(props.value);
  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(props.action( e.target.value ));
    setValue(e.target.value);
  }

  return(
    <label htmlFor={props.id} className="form__label">
      <input 
        id={ props.id } 
        name={ props.id } 
        type={ props.type }
        value={ value } 
        className={`form__input ${isActive ? 'form__input--active' : ''} ${value !== '' ? 'form__input--not-empty' : ''}`}
        onFocus={ _ => setActive(false) }
        onBlur={ _ => setActive(false) }
        onChange={ e => onChange(e) }
      />
      <span className="form__input-placeholder">{props.placeholder}</span>
      <span className="form__input-border"></span>
    </label>
  )
}