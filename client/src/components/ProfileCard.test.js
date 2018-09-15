import React from 'react';
import { shallow } from 'enzyme';
import ProfileCard from './ProfileCard';
import { Card, Image } from 'semantic-ui-react';

const profile = {};

describe('ProfileCard component', () => {
  it('renders without crashing', () => {
    shallow(<ProfileCard profile={profile}/>);
  });

  it('renders the profile', () => {
    const wrapper = shallow(<ProfileCard profile={profile}/>);
    expect(wrapper.find(Card).exists()).toBe(true);
    expect(wrapper.find(Image).exists()).toBe(true);
    expect(wrapper.find(Card.Content).exists()).toBe(true);
    expect(wrapper.find(Card.Header).exists()).toBe(true);
    expect(wrapper.find(Card.Description).exists()).toBe(true);
    expect(wrapper.find(Card.Meta).exists()).toBe(true);
  });
});
