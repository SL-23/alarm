/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TimeZoneSection from './components/TimeZoneSection';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };
  const dateInformation = new Date();
  const [localTime, setLocationTime] = useState(dateInformation);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocationTime(new Date()), 600000;
    });
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: Colors.black,
        }}></View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: Colors.black,
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: Colors.black,
          }}>
          <TimeZoneSection title="Local" timeZone="Australia/Adelaide" />
          <TimeZoneSection title="SDY" timeZone="Australia/Sydney" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
