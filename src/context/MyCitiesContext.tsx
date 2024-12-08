import {createContext} from 'react';
import {cityTimezoneMap} from '../components/staticCityTimezoneMap';
export type AvailableCity = keyof typeof cityTimezoneMap;

export interface CityTimezone {
  city: AvailableCity;
  timezone: string;
}

export interface MyTimeZonesContextType {
  myCities: AvailableCity[];
  addCity: (city: AvailableCity) => void;
  removeCity: (city: AvailableCity) => void;
  setAllCities: (cites: AvailableCity[]) => void;
}

const MyCitiesContext = createContext<MyTimeZonesContextType>({
  myCities: [],
  addCity: () => {},
  removeCity: () => {},
  setAllCities: () => {},
});

export default MyCitiesContext;
