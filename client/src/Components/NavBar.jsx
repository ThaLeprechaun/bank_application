import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import Nav from './Nav';

export default function NavBar({ fixed }) {
  return (
    <Segment inverted textAlign="center" vertical>
      <Menu
        fixed={fixed ? 'top' : null}
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Nav fixed={fixed} />
      </Menu>
    </Segment>
  );
}
