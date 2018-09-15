import React from 'react';
import { shallow } from 'enzyme';
import ErrorHeader from './ErrorHeader';

describe('ErrorHeader component', () => {
  it('renders without crashing', () => {
    shallow(<ErrorHeader/>);
  });
});
