import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const NotFoundHeader = (props) => {
  return (
      <div>
        <Segment className="ui inverted vertical center aligned error">
          <h1 className="ui inverted stackable header">
            <Image className="ui massive" src="/assets/logo3.png" alt="logo"/>
            <div className="content">Dēsigner Finder</div>
          </h1>
          <h3>Sorry, that page couldn't be found</h3>
            <p>Please use the menu above to search for a profile</p>
        </Segment>
      </div>
  );
};

export default NotFoundHeader;
