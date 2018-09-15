import React from 'react';
import { Image, Tab, Divider, Popup } from 'semantic-ui-react';

const ProjectPane = ({ projects = [] }) => {
  return (
      <Tab.Pane attached={false}>
        <h4>This user's projects</h4>
        <Divider/>
        <Image.Group size="small" style={{ textAlign: 'center' }}>
          {
            projects.map(({ covers = [], url = '#', name = 'Unknown' }, i) => {
              const image = (covers.length && covers[0].url) ?
                  covers.filter(cover => cover.size < 400)[0].url :
                  '/assets/behance_medium.png';
              const projectImage = (
                  <Image
                      href={url}
                      as="a"
                      target="_blank"
                      spaced src={image}/>
              );
              return (
                  <Popup
                      verticalOffset={-56}
                      inverted size="mini"
                      key={i} trigger={projectImage}
                      header={'Project Name'}
                      content={name}/>
              );
            })
          }
        </Image.Group>
      </Tab.Pane>
  );
};

export default ProjectPane;
