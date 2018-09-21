import React from 'react';
import { Query } from 'react-apollo';
import { Icon, Tab, Item, Divider } from 'semantic-ui-react';
import { FOLLOWERS_QUERY } from '../queries';
import LoadingAnimation from './LoadingAnimation';
import ErrorHeader from './ErrorHeader';

const FollowersPane = ({ profileUsername }) => {
  const query = FOLLOWERS_QUERY ;
  const heading = 'Following this user';
  return (
      <Tab.Pane attached={false}>
        <h4>{heading}</h4>
        <Divider/>
        <Query query={query} variables={{ profileUsername, perPage: 8, page: 1 }}>
          {
            ({ data: { followers: { items: follows = [] , pageInfo } = {} } = {}, loading, error, fetchMore }) => {
              console.log(follows, loading, error);
              if (loading) {
                return <LoadingAnimation/>;
              }
              if (error) {
                return <ErrorHeader/>;
              }
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

export default FollowersPane;
