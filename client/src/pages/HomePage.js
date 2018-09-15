import React from 'react';
import { Container, Image, Segment } from 'semantic-ui-react';
import ProfileSearch from '../components/ProfileSearch';

const HomePage = (props) => {
  return (
      <div>
        <Segment className="ui inverted vertical masthead center aligned">
          <Container className="ui text">
            <h1 className="ui inverted stackable header">
              <Image className="ui massive" src="/assets/logo3.png" alt="logo"/>
              <div className="content">Dēsigner Finder</div>
            </h1>
            <h2>Search for Bēhance users</h2>
            <h6 className="info-text">Press "Enter" to submit</h6>
            <ProfileSearch { ...props } />
          </Container>
        </Segment>

        <div style={{ textAlign: 'center' }}>
          Powered by Bēhance
        </div>
      </div>
  );
};

export default HomePage;
