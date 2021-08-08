import React from 'react';
import { CountryType } from './types/country.type';
import { Grid } from '@material-ui/core';

type CountryPropsType = {
  country: CountryType;
  amount: number;
};

export const Country = (props: CountryPropsType): React.ReactElement => {
  const { country, amount } = props;

  return (
    <Grid container spacing={2} mt={1} display="flex">
      <Grid item xs={3}>
        {country.name}
      </Grid>
      <Grid item xs={3}>
        {country.population}
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {country.currencies.map((currency) => (
          <Grid item key={currency.code}>
            {currency.name}: {currency.symbol}{' '}
            {(currency.exchangeRate * amount).toFixed(2)}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Country;
