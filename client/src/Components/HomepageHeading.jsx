import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

// import HomepageHeading from './HomepageHeading'

// const CustomHeader = styled.h1`
//   font-size: ${props => (props.mobile ? '2em' : '4em')};
//   font-weight: 'normal';
//   margin-bottom: 0;
//   margin-top: ${props => (props.mobile ? '1.5em' : '2em')}
// `

const HomepageHeading = ({ mobile }) => {
  return (
    <Segment
      inverted
      textAlign="center"
      style={{ height: '90vh', padding: '1em 0em' }}
      vertical
    >
      <Container
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Header
          as="h1"
          content="The Bank"
          inverted
          style={{
            fontSize: mobile ? '3em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            // marginTop: mobile ? '3em' : '2em',
          }}
        />

        <Header
          as="h2"
          content="Thinking of what banking app to use?"
          inverted
          style={{
            fontSize: mobile ? '1em' : '1.4em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
          }}
        />
        <Button primary size="huge" as={Link} to="/login">
          Let's Start
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomepageHeading;
