import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Container, Typography } from '@material-ui/core';
import Baseline from '@material-ui/core/CssBaseline';
import { CountriesList } from './components/CountriesList/CountriesList';
import { AUTH_TOKEN } from './constants';

const LOGIN = gql`
  query Login {
    login {
      access_token
    }
  }
`;

function App() {
  useQuery(LOGIN, {
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.access_token);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Baseline />
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Currency Exchange Demo
        </Typography>
        <CountriesList />
      </Box>
    </Container>
  );
}

export default App;
