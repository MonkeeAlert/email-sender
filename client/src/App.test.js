import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('Renders properly', () => {
    const component = shallow(<App />);
    const app = component.find('main');

    expect(app.length).toBe(1);
  })
})