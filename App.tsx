/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import TimeZoneSection from './components/TimeZoneSection';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'darker',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: 'black',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: 'black',
          }}>
          <TimeZoneSection title="Local" timeZone="Australia/Adelaide" />
          <TimeZoneSection title="SDY" timeZone="Australia/Sydney" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
