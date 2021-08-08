import { useCallback, useMemo, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { CountryType } from '../../Country/types/country.type';

const COUNTRY = gql`
  query SearchCountry($name: String!) {
    country(name: $name) {
      id
      name
      population
      currencies {
        code
        name
        symbol
        exchangeRate
      }
    }
  }
`;

type CountriesListType = {
  countries: CountryType[];
  searchCountry: (name: string) => void;
  error: string;
  clearError: () => void;
};

export const useCountriesList = (): CountriesListType => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [error, setError] = useState<string>('');

  const [search] = useLazyQuery(COUNTRY, {
    onCompleted: ({ country: newCountry }) => {
      setCountries([...countries, newCountry]);
    },
    onError: (error) => {
      console.error('error', error);
      setError(error.message);
    },
  });

  const searchCountry = useCallback(
    (name: string) => {
      search({
        variables: {
          name,
        },
      });
    },
    [search],
  );

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return useMemo(
    () => ({
      countries,
      searchCountry,
      error,
      clearError,
    }),
    [countries, searchCountry, error, clearError],
  );
};
