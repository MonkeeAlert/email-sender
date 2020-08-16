import React, { useState } from 'react';

import Clip from '../../svg/clip.svg';
import { useDispatch } from 'react-redux';

export const AttachFile = props => {
  const formats = props.formats.join(',');
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState('');

  const MAX_SIZE = props.maxSize * 1024 ** 2;
  const MAX_COUNT = props.maxCount;

  const dispatch = useDispatch();

  const onChange = e => {
    let hasOverflow = false;

    let f = [].map.call(e.target.files, i => {
      return {
        name: i.name,
        size: i.size,
        type: i.type     
      }
    });

    if(f.length > MAX_COUNT) {
      hasOverflow = true; 
      setError(`Max amount of files is ${MAX_COUNT}`);
    }

    f.forEach(i => {
      if(i.size > MAX_SIZE) {
        hasOverflow = true;
        setError(`File ${i.name.slice(0, 10) + '...'} is larger ${props.maxSize}mb`);
      }
    });
    
    if(hasOverflow) return;
    else {
      setError();
      dispatch(props.action(f));
      setValue(f);
    }
  }

  return(
    <div>
      <label className="form__label--file">
        <input 
          id="file" 
          name="file" 
          type="file"
          className="form__file"
          data-max-size={MAX_SIZE}
          data-max-count={MAX_COUNT}
          accept={formats}
          multiple
          onChange={ e => onChange(e) }
        />
        <img src={Clip} alt="clip" className="form__file-img"/>
        <span className="form__file-text">{value.length > 0 ? `${value.length} file(s)` : 'Attach file'}</span>
        </label>
        
        {value.length > 0 ? (
          <span className="form__file-clear" onClick={ _ => {
            document.getElementById('file').value = '';
            dispatch(props.action([]));
            setValue([]);
          }}>&times;</span>
        ): ''}

        {error ? (
          <span className="form__file-error">{error}</span>
        ) : ''}
    </div>
  )
}