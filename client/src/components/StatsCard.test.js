import React from 'react';
import { shallow } from 'enzyme';
import StatsCard from './StatsCard';
import { List } from 'semantic-ui-react';

const stats = {
  followers: 10,
  following: 100,
  appreciations: 50,
  views: 100
};

describe('StatsCard component', () => {
  it('renders without crashing', () => {
    shallow(<StatsCard stats={stats}/>);
  });

  it('renders the stats', () => {
    const wrapper = shallow(<StatsCard stats={stats}/>);
    expect(wrapper.find(List).exists()).toBe(true);
    expect(wrapper.find(List.Item)).toHaveLength(4);
  });
});
