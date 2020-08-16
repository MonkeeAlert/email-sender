import React, { useState  } from 'react';
import { useDispatch } from 'react-redux';

export const Textarea = props => {
  const [value, setValue] = useState(props.value);
  const [isActive, setActive] = useState(false);
  
  const dispatch = useDispatch();
  
  const onChange = e => {
    dispatch(props.action( e.target.value ));
    setValue(e.target.value);
  }

  return(
    <label htmlFor={props.id} className="form__label">
      <textarea 
        id={props.id} 
        name={props.id} 
        className={`form__textarea ${isActive ? 'form__textarea--active' : ''} ${value !== '' ? 'form__textarea--not-empty' : ''}`}
        onFocus={_ => setActive(false)}
        onBlur={_ => setActive(false)}
        onChange={ e => onChange(e) }
        rows="8"
      />
      <span className="form__textarea-placeholder">{props.placeholder}</span>
      <span className="form__textarea-border"></span>
    </label>
  )
}