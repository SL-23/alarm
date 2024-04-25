import React from 'react';
import {ScrollView, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';

const Home = () => {
  return (
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
  );
};

export default Home;
