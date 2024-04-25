import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';

const Home = ({navigation}: {navigation: any}) => {
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
          <TimeZoneSection
            navigation={navigation}
            title="Local"
            timeZone="Australia/Adelaide"
          />
          <TimeZoneSection
            navigation={navigation}
            title="SDY"
            timeZone="Australia/Sydney"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
