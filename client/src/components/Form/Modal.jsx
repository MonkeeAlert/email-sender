import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';

const Modal = forwardRef((_, ref) => {
  const [ isVisible, setVisibility ] = useState(false);
  
  const el = useRef(ref);
  const show = _ => setVisibility(true);
  const hide = _ => setVisibility(false);

  useImperativeHandle(ref, _ => {
    return { el, show, hide }
  })


  return (
    <section ref={el} className={`modal__message ${ isVisible ? 'modal__message--visible' : '' }`}>
      <div className="modal__bg"></div>
      <div className="modal__content">
        <div className="modal__text--message"></div>
        <span onClick={ hide } className="modal__button button button--green">Ok</span>
      </div>
    </section>
  );
});

export default Modal;