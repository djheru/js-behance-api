import React from 'react';
import { Item } from 'semantic-ui-react';

const ProfileSearchResults = ({ id, images, username, display_name, city, country }) => {
  const profileImage = (images && images.length && images[0].url) ?
        images[0].url : '/assets/logo5.png';
    return (
        <Item as="a" key={id}>
          <Item.Image style={{ float: 'left' }} size='tiny' src={profileImage} />
          <Item.Content style={{ float: 'left', margin: '0' }}>
            <Item.Header as="h4" style={{ marginBottom: '2px', float: 'left'}}>
              {display_name}
            </Item.Header>
            <br/>
            <Item.Description
                as="em" style={{ fontSize: '.7em', float: 'left'}}>
              {`${city || 'unknown city'}, ${country || 'unknown country'}`}
            </Item.Description>
          </Item.Content>
        </Item>
    );
};

export default ProfileSearchResults;
