import {createContext} from 'react';

export interface MyTimeZonesContextType {
  myTimeZones: string[];
  addMyTimeZone: (timeZone: string) => void;
  removeMyTimeZone: (timeZone: string) => void;
}

const MyTimeZonesContext = createContext<MyTimeZonesContextType>({
  myTimeZones: [],
  addMyTimeZone: () => {},
  removeMyTimeZone: () => {},
});

export default MyTimeZonesContext;
