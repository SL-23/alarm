import {createContext} from 'react';

export interface MyTimeZonesContextType {
  myTimeZones: string[];
  addMyTimeZone: (timeZone: string) => void;
  removeMyTimeZone: (timeZone: string) => void;
  setSavedTimeZones: (timeZones: string[]) => void;
}

const MyTimeZonesContext = createContext<MyTimeZonesContextType>({
  myTimeZones: [],
  addMyTimeZone: () => {},
  removeMyTimeZone: () => {},
  setSavedTimeZones: () => {},
});

export default MyTimeZonesContext;
