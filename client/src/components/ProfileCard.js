import React from 'react';
import { Card, Divider, Image, Icon } from 'semantic-ui-react';

const ProfileCard = ({ profile }) => {
  const {
    display_name: displayName = 'Unknown Name',
    username = 'unknown',
    occupation = 'unknown',
    images = [],
    company = '',
    country = 'Unknown country',
    city = 'Unknown city',
    created_on
  } = profile;

  const profileImage = (images.length) ? images.pop().url : '/assets/behance_large.png';
  const joinDate = new Date((1000 * created_on) || Date.now());
  const dateString = `${joinDate.getMonth()}/${joinDate.getDate()}/${joinDate.getFullYear()}`;

  return (
      <Card fluid>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Image
              circular bordered
              className="profile-image"
              src={profileImage}/>
        </div>
        <Card.Content>
          <Card.Header as={'h1'} style={{ fontSize: '1.6em' }}>{displayName}</Card.Header>
          <Card.Meta>
            <span className='date'>@{username}</span>
          </Card.Meta>
          <Divider/>
          <Card.Content extra>
            {occupation}
          </Card.Content>
          <Divider/>
          <Card.Description>
            {
              (company) ? (
                  <div><Icon name='building'/> Freelancer</div>
              ) : null
            }
            <div><Icon name='map marker alternate'/>{`${city}, ${country}`}</div>
            <div><Icon name='calendar'/>Joined {dateString}</div>
          </Card.Description>
        </Card.Content>
      </Card>
  );
};

export default ProfileCard;
