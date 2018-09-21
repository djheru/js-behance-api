import React from 'react';
import { Query } from 'react-apollo';
import { Image, Tab, Divider, Popup } from 'semantic-ui-react';
import { PROJECTS_QUERY } from '../queries';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingAnimation from './LoadingAnimation';
import ErrorHeader from './ErrorHeader';

const ProjectPane = ({ profileUsername }) => {
  return (
      <Query query={PROJECTS_QUERY} variables={{ profileUsername, perPage: 12, page: 1 }}>
        {
          ({ data: { projects: { pageInfo, items: projects = [] } = {} } = {}, loading, error, fetchMore }) => {
            console.log(projects.length, pageInfo);
            if (loading) {
              return <LoadingAnimation/>;
            }
            if (error) {
              return <ErrorHeader/>;
            }

            const renderProjects = (projects) =>
                projects.map(({ id, covers = [], url = '#', name = 'Unknown' }) => {
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
                          key={id}
                          verticalOffset={-56}
                          inverted size="mini"
                          trigger={projectImage}
                          header={'Project Name'}
                          content={name}/>
                  );
                });

            console.log((pageInfo.page * pageInfo.perPage),projects.length);
            return (
                <Tab.Pane attached={false}>
                  <h4>This user's projects</h4>
                  <Divider/>
                  <Image.Group size="small" style={{ textAlign: 'center' }}>
                    <InfiniteScroll
                        pageStart={pageInfo.page + 1}
                        loadMore={async () =>
                            fetchMore({
                              variables: {
                                profileUsername,
                                perPage: pageInfo.perPage,
                                page: pageInfo.page + 1
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                console.log(fetchMoreResult);
                                const { projects: oldProjects } = prev;
                                const { projects: newProjects } = fetchMoreResult;

                                const pageInfo = newProjects.pageInfo;
                                const oldItems = oldProjects.items || [];
                                const newItems = [ ...oldItems, ...(newProjects.items || []) ];

                                const newData = Object.assign({}, fetchMoreResult, {
                                  projects: Object.assign({}, fetchMoreResult.projects, { pageInfo, items: newItems } )
                                });
                                return newData;
                              }
                            })}
                        threshold={200}
                        hasMore={((pageInfo.page * pageInfo.perPage) === projects.length)}
                        loader={(<div className="loader" key={0}>Loading ...</div>)}>

                      { renderProjects(projects) }
                    </InfiniteScroll>
                  </Image.Group>
                </Tab.Pane>
            );
          }
        }
      </Query>
  );
};

export default ProjectPane;
