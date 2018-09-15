import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

it('renders without crashing', () => {
  shallow(<NotFound/>);
});

it('displays the NotFound component', () => {
  const wrapper = shallow(<NotFound/>);
  expect(wrapper.find('NotFoundHeader').exists()).toBe(true);
});
