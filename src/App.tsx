import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './screens/Home';
import MyCitiesContext, {AvailableCity} from './context/MyCitiesContext';
import Worldtime from './components/Worldtime';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'darker',
  };
  const [myCities, setMyCities] = useState<AvailableCity[]>([]);
  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <MyCitiesContext.Provider
          value={{
            myCities,
            addCity: city => {
              setMyCities([...myCities, city]);
            },
            removeCity: city => {
              const removed = myCities.filter(c => c === city);
              setMyCities(removed);
            },
            setAllCities(timeZones) {
              setMyCities(timeZones);
            },
          }}>
          <Home />
        </MyCitiesContext.Provider>
        {/* <Worldtime /> */}
      </SafeAreaView>
    </>
  );
}

export default App;
