import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';
import AddTimeZone from '../components/AddTimeZone';
import MyTimeZonesContext from '../context/MyTimeZonesContext';
import LocalTime from '../components/LocalTime';
import {getBackgroundColor} from '../helpers/helpers';

const Home = () => {
  const {myTimeZones} = useContext(MyTimeZonesContext);
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
