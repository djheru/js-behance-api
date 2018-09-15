import React from 'react';
import { shallow } from 'enzyme';
import FollowPane from './FollowPane';
import { Tab, Item } from 'semantic-ui-react';

describe('FollowPane component', () => {
  const follows = [
    {
      url: 'http://example.com',
      username: 'joey',
      display_name: 'joe schmoe',
      city: 'ny',
      country: 'USA',
      stats: { followers: 100 },
      images: []
    }
  ];
  const heading = 'it is a test';

  it('renders without crashing', () => {
    shallow(<FollowPane/>);
  });

  it('displays the supplied heading', () => {
    const wrapper = shallow(<FollowPane heading={heading}/>);
    expect(wrapper.contains(<h4>{heading}</h4>)).toBe(true);
  });

  it('renders the follows', () => {
    const wrapper = shallow(<FollowPane heading={heading} follows={follows}/>);
    expect(wrapper.find(Tab.Pane).exists()).toBe(true);
    expect(wrapper.find(Item).exists()).toBe(true);
    expect(wrapper.find(Item.Image).exists()).toBe(true);
    expect(wrapper.find(Item.Header).exists()).toBe(true);
    expect(wrapper.find(Item.Content).exists()).toBe(true);
    expect(wrapper.find(Item.Extra).exists()).toBe(true);
  });
});
