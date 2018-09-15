import React from 'react';
import { Icon, Tab, Item, Divider } from 'semantic-ui-react';

const FollowPane = ({ heading, follows = [] }) => {
  return (
      <Tab.Pane attached={false}>
        <h4>{heading}</h4>
        <Divider/>
        <Item.Group relaxed divided link>
          {
            (follows.length) ?
                follows
                    .filter(follow => (follow.stats.followers))
                    .map(({ url, username, display_name, city, country, images, stats }, i) => {
                  const profileImage = (images.length) ? images.pop().url : '/assets/behance_large.png';
                  return (
                      <Item key={i}>
                        <Item.Image as="a" href={url} target="_blank" size='tiny' src={profileImage} bordered/>

                        <Item.Content verticalAlign='middle'>
                          <Item.Header as="a" href={url} target="_blank">
                            { display_name || username }
                          </Item.Header>
                          <Item.Content>
                            {
                              (city && country) ? `${city}, ${country}` : 'Location unknown'
                            }
                          </Item.Content>
                          <Item.Extra style={{ textAlign: 'right' }}>
                            <Icon name="users" />Followers: {stats.followers || '???'}&nbsp;
                            {' '}&nbsp;
                            <Icon name="users" />Following: {stats.following || '???'}
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                  );
                }) :
                <h5>No profiles found</h5>
          }
        </Item.Group>
      </Tab.Pane>
  );
};

export default FollowPane;
