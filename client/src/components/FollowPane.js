import React from 'react';
import { Query } from 'react-apollo';
import { Icon, Tab, Item, Divider } from 'semantic-ui-react';
import { FOLLOWERS_QUERY, FOLLOWING_QUERY } from '../queries';
import LoadingAnimation from './LoadingAnimation';
import ErrorHeader from './ErrorHeader';

const FollowPane = ({ profileUsername, type = FollowPane.FOLLOWERS }) => {
  const query = (type === FollowPane.FOLLOWERS) ? FOLLOWERS_QUERY : FOLLOWING_QUERY;
  const heading = (type === FollowPane.FOLLOWERS) ? 'Following this user' : 'This user follows';
  const key = type.toLowerCase();
  const defaultData = { [key]: [] };
  return (
      <Tab.Pane attached={false}>
        <h4>{heading}</h4>
        <Divider/>
        <Query query={query} variables={{ profileUsername, perPage: 24, page: 1 }}>
          {
            ({ data = defaultData, loading, error }) => {
              console.log(loading, error);
              if (loading) {
                return <LoadingAnimation/>;
              }
              if (error) {
                return <ErrorHeader/>;
              }

              //const { pageInfo = {} } = data;
              const { items: follows, pageInfo } = (data[key]) ? data[key] : { items: [], pageInfo: {} };
              return (

                  <Item.Group relaxed divided link>
                    {
                      (follows.length) ?
                          follows
                              .filter(follow => (follow.stats.followers))
                              .map(({ url, username, display_name, city, country, images, stats }, i) => {
                                const profileImage = (images.length) ? images.pop().url : '/assets/behance_large.png';
                                return (
                                    <Item key={i}>
                                      <Item.Image as="a" href={url} target="_blank" size='tiny' src={profileImage}
                                                  bordered/>

                                      <Item.Content verticalAlign='middle'>
                                        <Item.Header as="a" href={url} target="_blank">
                                          {display_name || username}
                                        </Item.Header>
                                        <Item.Content>
                                          {
                                            (city && country) ? `${city}, ${country}` : 'Location unknown'
                                          }
                                        </Item.Content>
                                        <Item.Extra style={{ textAlign: 'right' }}>
                                          <Icon name="users"/>Followers: {stats.followers || '???'}&nbsp;
                                          {' '}&nbsp;
                                          <Icon name="users"/>Following: {stats.following || '???'}
                                        </Item.Extra>
                                      </Item.Content>
                                    </Item>
                                );
                              }) :
                          <h5>No profiles found</h5>
                    }
                  </Item.Group>
              );
            }
          }
        </Query>

      </Tab.Pane>

  );
};

FollowPane.FOLLOWERS = 'FOLLOWERS';
FollowPane.FOLLOWING = 'FOLLOWING';

export default FollowPane;
