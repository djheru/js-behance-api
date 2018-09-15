import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Icon } from 'semantic-ui-react';

const NavBar = () => {
  return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo3.png" alt="logo" /> &nbsp; Dēsigner Finder
          </Menu.Item>
          <Menu.Item
              active={true}
              position="right"
              as={Link} to="/"
              name="Home">
            <Icon size="large" name="search"/> New Search
          </Menu.Item>
        </Container>
      </Menu>
  );
};

export default NavBar;
