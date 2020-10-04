import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header/Header';
import { findByTestAttr, checkProps } from '../../../utils/index';
// import { render, unmountComponentAtNode } from 'react-dom';
// import { act } from 'react-dom/test-utils';

const setup = ( props = {}) => {
  const component = shallow(<Header { ...props } />);
  return component;
}

describe('Header component', () => {
  let component;

  beforeEach( () => component = setup() );

  it('Renders properly', () => {
    const wrapper = findByTestAttr(component, 'header' );
    expect(wrapper.length).toBe(1);
  });

  it('Must contain elements', () => {
    const elements = findByTestAttr(component, 'header' );
    expect(elements.children.length).toBeGreaterThan(0);
  });

  it('Should not throw a warning', () => {
    const propsErr = checkProps(Header, { value: 'Test' });
    expect(propsErr).toBeUndefined();
  })
})

/* ==== UNIT TEST W/O Enzyme ==== */

// describe('Header component:', () => {
//   let container = null;

//   beforeEach( () => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
//   })

//   afterEach( () => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//   })

//   it('Renders properly', () => {
//     act(() => {
//       render(<Header/>, container)
//     });

//     expect(container.children.length).toBe(1);
//   })
// })