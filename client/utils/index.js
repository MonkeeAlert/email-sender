import checkPropTypes from 'check-prop-types';
import { reducer } from '../src/redux/reducers';
import { applyMiddleware, createStore } from 'redux';
import { middlewares } from '../src/redux/store';

export const findByTestAttr = ( component, attr ) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
}

export const checkProps = ( component, expectedProps ) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsErr;
} 

export const checkEmail = value => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return re.test(value);
}

export const setState = ( state, action, payload ) => {
  const newState = reducer( state, { type: action.type, payload });

  return newState;
}

export const testStore = ( initialState ) => {
  const createStoreWithMiddleware = applyMiddleware( ...middlewares)(createStore);
  return createStoreWithMiddleware(reducer, initialState);
}