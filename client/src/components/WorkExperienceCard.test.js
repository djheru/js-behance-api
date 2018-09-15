import React from 'react';
import { shallow } from 'enzyme';
import WorkExperienceCard from './WorkExperienceCard';
import { List, Icon } from 'semantic-ui-react';

const workExperience = [
  {
    position: 'worker',
    location: 'over there',
    organization: 'bizcorp'
  }
];

describe('WorkExperienceCard component', () => {
  it('renders without crashing', () => {
    shallow(<WorkExperienceCard/>);
  });

  it('renders the work experience', () => {
    const wrapper = shallow(<WorkExperienceCard workExperience={workExperience}/>);
    expect(wrapper.find(List).exists()).toBe(true);
    expect(wrapper.find(List.Item).exists()).toBe(true);
    expect(wrapper.find(List.Header).exists()).toBe(true);
    expect(wrapper.find(Icon).exists()).toBe(true);
  });

  it('renders the "no work experience" message', () => {
    const wrapper = shallow(<WorkExperienceCard/>);
    expect(wrapper.contains(<h5>No work experience listed</h5>)).toBe(true);
  })
});
