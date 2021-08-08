import { CurrencyType } from './currency.type';

export type CountryType = {
  id: string;
  name: string;
  population: number;
  currencies: CurrencyType[];
}
