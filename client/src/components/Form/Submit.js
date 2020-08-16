import React from 'react';

export const Submit = props => {
  return(
    <input 
      id="submit" 
      name="submit" 
      type="submit"
      className="form__submit"
      value={props.value}
    />
  )
}