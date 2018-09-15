import React from 'react';
import { Divider, Header, List, Segment } from 'semantic-ui-react';

const StatsCard = ({ stats }) => {
  return (
      <Segment>
        <Header as="h5">
          Stats
        </Header>
        <Divider fitted/>
        <List relaxed style={{ fontSize: '.9em'}}>
          <List.Item icon="users" content={`Followers: ${stats.followers || '???'}`}/>
          <List.Item icon="users" content={`Following: ${stats.following || '???'}`}/>
          <List.Item icon="heart" content={`Appreciations: ${stats.appreciations || '???'}`}/>
          <List.Item icon="eye" content={`Views: ${stats.views || '???'}`}/>
        </List>
      </Segment>
  );
};

export default StatsCard;
