import React from 'react';
import { shallow } from 'enzyme';
import ProfileSearch from './ProfileSearch';

describe('ProfileSearch component', () => {
  it('renders without crashing', () => {
    shallow(<ProfileSearch/>);
  });
});
