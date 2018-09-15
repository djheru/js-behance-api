import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

it('renders without crashing', () => {
  shallow(<HomePage/>);
});

it('displays the ProfileSearch component', () => {
  const wrapper = shallow(<HomePage/>);
  expect(wrapper.find('ProfileSearch').exists()).toBe(true);
});
