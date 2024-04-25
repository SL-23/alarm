/**
 * Sample React Native SetAlarm
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';

function SetAlarm(): React.JSX.Element {
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
        <View>
          <Text
            style={{
              fontSize: 32,
              color: 'yellow',
            }}>
            Set new alarm
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SetAlarm;
