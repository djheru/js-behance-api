import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingAnimation = ({ inverted }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content="Loading..." />
    </Dimmer>
  );
};

export default LoadingAnimation;
