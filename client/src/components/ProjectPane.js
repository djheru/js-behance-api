import React from 'react';
import { Query } from 'react-apollo';
import { Image, Tab, Divider, Popup } from 'semantic-ui-react';
import { PROJECTS_QUERY } from '../queries';
import LoadingAnimation from './LoadingAnimation';
import ErrorHeader from './ErrorHeader';

const ProjectPane = ({ profileUsername }) => {
  return (
      <Query query={PROJECTS_QUERY} variables={{ profileUsername, perPage: 24, page: 1 }}>
        {
          ({ data: { projects: { pageInfo, items: projects = [] } = {} } = {} } = {}, loading, error) => {
            console.log(pageInfo, loading, error);
            if (loading) {
              return <LoadingAnimation/>;
            }
            if (error) {
              return <ErrorHeader/>;
            }

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
          }
        }
      </Query>
  );
};

export default ProjectPane;
