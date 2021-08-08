import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { useCountriesList } from './hooks/useCountriesList';
import Country from '../Country/Country';

export const CountriesList = (): React.ReactElement => {
  const [amount, setAmount] = useState<number>(0);
  const { countries, searchCountry, error, clearError } = useCountriesList();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    searchCountry(data.get('country') as string);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    clearError();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 1 }} width={1}>
        <TextField
          margin="normal"
          fullWidth
          id="amount"
          label="Enter amount in SEK"
          name="amount"
          autoComplete="amount"
          onChange={(e) => setAmount(+e.target.value)}
          error={isNaN(amount)}
          helperText={isNaN(amount) ? 'Incorrect entry' : ''}
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, gap: 2 }}
        width={1}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              margin="normal"
              fullWidth
              id="country"
              label="Search country"
              name="country"
              autoComplete="country"
              autoFocus
            />
          </Grid>
          <Grid item xs={2} display="flex" alignItems="center">
            <Button type="submit">Add</Button>
          </Grid>
        </Grid>
      </Box>
      {!!countries.length && (
        <Grid container spacing={2} mt={1} display="flex">
          <Grid item xs={3}>
            <Typography fontWeight="fontWeightBold">Country</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight="fontWeightBold">Population</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight="fontWeightBold" align="right">
              Currency
            </Typography>
          </Grid>
        </Grid>
      )}
      {countries.map((country) => (
        <Country key={country.id} country={country} amount={amount | 0} />
      ))}
      <Snackbar open={!!error} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};
