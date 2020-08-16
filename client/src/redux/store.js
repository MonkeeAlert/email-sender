import { createStore } from 'redux';
import { reducer } from './reducers';

export const initialState = {
  form: {
    senderName: '',
    senderMail: '',
    recipicientName: '',
    recipicientMail: '',
    subject: '',
    message: '',
    files: []
  }
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) 