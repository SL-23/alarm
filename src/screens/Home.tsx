import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';
import AddTimeZone from '../components/AddTimeZone';
import MyTimeZonesContext from '../context/MyTimeZonesContext';

const Home = () => {
  const {myTimeZones} = useContext(MyTimeZonesContext);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: 'black',
        height: '100%',
      }}>
      <AddTimeZone />
      <View
        style={{
          backgroundColor: 'black',
        }}>
        <TimeZoneSection title="Local" timeZone="Australia/Adelaide" />
        {myTimeZones.map(zone => (
          <TimeZoneSection
            key={zone}
            title={zone.split('/')[1]}
            timeZone={zone}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
