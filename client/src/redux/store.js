import { applyMiddleware, createStore, compose } from 'redux';
import { reducer } from './reducers';
import ReduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
  composeEnhancers( applyMiddleware(...middlewares) )
) 