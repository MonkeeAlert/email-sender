import { applyMiddleware, createStore } from 'redux';
import { reducer } from './reducers';
import ReduxThunk from 'redux-thunk';

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

export const middlewares = [ ReduxThunk ];

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) 