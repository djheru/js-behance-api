import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from './ProfilePage';

const match = { params: { username: 'jimbo' }, isExact: true, path: '', url: '' };

describe('ProfilePage component', () => {
  it('renders without crashing', () => {
    shallow(<ProfilePage match={match}/>);
  });
});
