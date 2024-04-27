import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App(): React.JSX.Element {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
