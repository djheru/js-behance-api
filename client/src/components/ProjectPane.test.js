import React from 'react';
import { shallow } from 'enzyme';
import ProjectPane from './ProjectPane';
import { Tab, Image, Popup } from 'semantic-ui-react';

const projects = [
  {
    covers: [],
    url: '',
    name: ''
  }
];
describe('ProjectPane component', () => {
  it('renders without crashing', () => {
    shallow(<ProjectPane/>);
  });

  it('renders the projects', () => {
    const wrapper = shallow(<ProjectPane projects={projects}/>);
    expect(wrapper.find(Tab.Pane).exists()).toBe(true);
    expect(wrapper.find(Image.Group).exists()).toBe(true);
    expect(wrapper.find(Popup).exists()).toBe(true);
  });
});
