import React from 'react';
import { Image, Segment } from 'semantic-ui-react';

const ErrorHeader = (props) => {
  return (
      <div>
        <Segment className="ui inverted vertical center aligned error">
            <h1 className="ui inverted stackable header">
              <Image className="ui massive" src="/assets/logo3.png" alt="logo"/>
              <div className="content">Dēsigner Finder</div>
            </h1>
            <h2>Sorry, there was some sort of error...</h2>
        </Segment>
      </div>
  );
};

export default ErrorHeader;
