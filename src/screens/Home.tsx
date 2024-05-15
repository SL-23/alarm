import React, {useContext, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';
import AddTimeZone from '../components/AddTimeZone';
import MyTimeZonesContext from '../context/MyTimeZonesContext';
import LocalTime from '../components/LocalTime';
import {getBackgroundColor} from '../helpers/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const {myTimeZones, setSavedTimeZones} = useContext(MyTimeZonesContext);
  const dateInformation = new Date();

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'long',
  } as Intl.DateTimeFormatOptions;
  const formatter = new Intl.DateTimeFormat([], options);

  const formattedTimeArr = formatter.format(dateInformation).split(' ');
  const timeZone = `${formattedTimeArr[1]}/${formattedTimeArr[2]}`;
  const currentTime = formattedTimeArr[0];

  const backgroundColor = getBackgroundColor(currentTime);

  const getData = async () => {
    try {
      const allSavedTimeZones = await AsyncStorage.getAllKeys();
      setSavedTimeZones(allSavedTimeZones as string[]);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, [myTimeZones]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor,
        height: '100%',
      }}>
      <AddTimeZone />
      <LocalTime timeZone={timeZone} currentTime={currentTime} />
      <View>
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
