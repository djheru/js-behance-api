import React from 'react';
import { Divider, Header, Icon, List, Segment } from 'semantic-ui-react';

const renderWorkList = (workExperience = []) => workExperience
    .map(({
            position = 'Unknown Position',
            location = 'Unknown Location',
            organization = 'Unknown Organization'
          }, i) => (
        <List.Item key={i}>
          <List.Header as="h5">{position} @ {organization}</List.Header>
          <em><Icon name='map marker alternate'/> {location}</em>
        </List.Item>
    ));
const WorkExperienceCard = ({ workExperience }) => {
  return (
      <Segment>
        <Header as="h5">
          Work Experience
        </Header>
        <Divider fitted/>
        <List style={{ fontSize: '.9em'}} relaxed divided>
          {
            (workExperience && workExperience.length) ?
                renderWorkList(workExperience) :
                <h5>No work experience listed</h5>
          }
        </List>
      </Segment>
  );
};

export default WorkExperienceCard;
