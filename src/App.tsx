import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './screens/Home';
import MyTimeZonesContext from './context/MyTimeZonesContext';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'darker',
  };
  const [myTimeZones, setMyTimeZones] = useState<string[]>([]);
  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <MyTimeZonesContext.Provider
          value={{
            myTimeZones,
            addMyTimeZone: timeZone => {
              setMyTimeZones([...myTimeZones, timeZone]);
            },
            removeMyTimeZone: timeZone => {
              setMyTimeZones(myTimeZones.filter(t => t !== timeZone));
            },
            setSavedTimeZones(timeZones) {
              setMyTimeZones(timeZones);
            },
          }}>
          <Home />
        </MyTimeZonesContext.Provider>
      </SafeAreaView>
    </>
  );
}

export default App;
