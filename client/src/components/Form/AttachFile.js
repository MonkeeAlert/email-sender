import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Clip from '../../svg/clip.svg';
import { useDispatch } from 'react-redux';

export const AttachFile = ({ formats, maxSize, maxCount, value, action }) => {
  const [val, setVal] = useState(value);
  const [err, setErr] = useState('');

  const MAX_SIZE = maxSize * 1024 ** 2;
  const MAX_COUNT = maxCount;

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
      setErr(`Max amount of files is ${MAX_COUNT}`);
    }

    f.forEach(i => {
      if(i.size > MAX_SIZE) {
        hasOverflow = true;
        setErr(`File ${i.name.slice(0, 10) + '...'} is larger ${ maxSize }mb`);
      }
    });
    
    if(hasOverflow) return;
    else {
      setErr();
      dispatch(action(f));
      setVal(f);
    }
  };

  const clearValue = _ => {
    document.getElementById('file').value = '';
    dispatch(action([]));
    setVal([]);
  }

  return(
    <div className="form__attach-wrapper">
      <label className="form__label--file">
        <input 
          id="file" 
          name="file" 
          type="file"
          className="form__file"
          data-max-size={MAX_SIZE}
          data-max-count={MAX_COUNT}
          accept={ formats.join(',') }
          multiple
          onChange={ e => onChange(e) }
        />
        <img src={Clip} alt="clip" className="form__file-img"/>
        <span className="form__file-text">{val.length > 0 ? `${val.length} file(s)` : 'Attach file'}</span>
        </label>
        
        { val.length > 0 ? <span className="form__file-clear" onClick={ _ => clearValue() }>&times;</span> : '' }

        { err ? <span className="form__file-err">{err}</span> : '' }
    </div>
  )
}

AttachFile.propTypes = {
  formats : PropTypes.array, 
  maxSize : PropTypes.number, 
  maxCount : PropTypes.number, 
  value : PropTypes.array, 
  action : PropTypes.func
}
