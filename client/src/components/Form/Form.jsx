import React, {useState, useEffect, useRef} from 'react';

import { Input } from './Input';
import { Textarea } from './Textarea';
import { AttachFile } from './AttachFile';
import { Submit } from './Submit';
import Modal from './Modal';

import { useStore } from 'react-redux';
import * as actions from '../../redux/actions';

export const Form = _ => {
  const [APIResponse, setAPI] = useState('');
  const form = useStore().getState().form;
  const store = useStore();
  const modal = useRef();

  const validateForm = e => {
    e.preventDefault();
    
    let errors = [];
    let form = store.getState().form; 
    
    [ ...document.querySelectorAll('.form__input--has-error') ].forEach(
      el => el.classList.remove('form__input--has-error')
    );

    if(form.senderName === '') 
      errors.push('sender_name');

    if(form.senderMail === '' || form.senderMail === form.recipicientMail) 
      errors.push('sender_email');

    if(form.recipicientName === '') 
      errors.push('recipicient_name');

    if(form.recipicientMail === '' || form.recipicientMail === form.senderMail) 
      errors.push('recipicient_email');

    if(form.subject === '') 
      errors.push('subject');

    if(form.message === '') 
      errors.push('message');
    
    if(errors.length > 0) {
      errors.forEach(
        n => { document.querySelector(`[name="${n}"]`).classList.add('form__input--has-error') 
      })
      return false;
    }

    let body = JSON.stringify({
      senderName: form.senderName, 
      senderEmail: form.senderMail, 
      recipicientName: form.recipicientName, 
      recipicientEmail: form.recipicientMail, 
      subject: form.subject, 
      message: form.message, 
      files: form.files
    });

    sendData('http://localhost:3001/send', body);
  }

  function callAPI() {
    fetch('http://localhost:3001/mailerAPI')
      .then( res => res.text())
      .then( res => setAPI(res))
  }

  async function sendData(url, data) {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    }).then(
      res => {
        modal.current.el.current.querySelector('.modal__text--message').innerHTML = res.status === 200 ? 'Message were successfully sent!' : 'Something is wrong';
        modal.current.show();
      }
    ).catch(
      err => {
        modal.current.el.current.querySelector('.modal__text--message').innerHTML = 'Failed to fetch';
        modal.current.show();
      }
    );
  }

  useEffect( _ => { callAPI() }, [APIResponse]);

  return (
      <form 
        method="POST" 
        action="send" 
        className="form" 
        onSubmit={ e => validateForm(e) }
        id="email-form"
        >
        <div className="form__row">
          <div className="form__block">
            <h2 className="form__text--header">
              <span>From</span>
            </h2>
            <Input 
              id='sender_name'  
              value={form.senderName}
              action={actions.setSenderNameAction} 
              type="text" 
              placeholder='Name'
            />
            <Input 
              id='sender_email' 
              value={form.senderMail} 
              action={actions.setSenderEmailAction} 
              type="email" 
              placeholder="Email" 
            />
          </div>
          <div className="form__block">
            <h2 className="form__text--header">
              <span>To</span>
            </h2>
            <Input 
              id='recipicient_name'  
              value={form.recipicientName} 
              action={actions.setRecipicientNameAction} 
              type="text" 
              placeholder="Name" 
            />
            <Input 
              id='recipicient_email'  
              value={form.recipicientMail} 
              action={actions.setRecipicientEmailAction} 
              type="email" 
              placeholder="Email" 
            />
          </div>
        </div>

        <div className="form__row">
          <Input 
            id='subject'  
            value={form.subject} 
            action={actions.setSubjectAction} 
            type="text" 
            placeholder="Subject" 
          />
        </div>

        <div className="form__row">
          <Textarea 
            id='message'  
            value={form.message} 
            action={actions.setMessageAction} 
            placeholder="Message"
          />
        </div>

        <div className="form__row">
          <AttachFile 
            id="attachments" 
            maxSize={5} 
            maxCount={5} 
            formats={['.doc', '.docx', '.pdf']} 
            value={[]}
            action={actions.addFilesAction}
          />
          <Submit value="Send"/>
        </div>

        <Modal ref={modal}/>
      </form>
  )
}