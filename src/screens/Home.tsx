import React, {useContext, useEffect} from 'react';
import {Alert, Button, ScrollView, View} from 'react-native';
import TimeZoneSection from '../components/TimeZoneSection';
import AddTimeZone from '../components/AddTimeZone';
import MyTimeZonesContext, {AvailableCity} from '../context/MyCitiesContext';
import LocalTime from '../components/LocalTime';
import {getBackgroundColor} from '../helpers/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const registerNotification = async () => {
  let token;
  const {status: existingStatus} = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const {status} = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Failed to get push token for push notification!');
    return;
  }
  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  // EAS projectId is used here.
  try {
    const projectId = 'stephanieL.alarm';

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log(token, 'DONE');
  } catch (e) {
    token = `${e}`;
  }
};

const Home = () => {
  const {myCities, setAllCities} = useContext(MyTimeZonesContext);
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
      setAllCities(allSavedTimeZones as AvailableCity[]);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, [myCities]);

  useEffect(() => {
    registerNotification();
    console.log('RE');
  }, []);

  const schedulePushNotification = async () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: {data: 'goes here', test: {test1: 'more data'}},
      },
      trigger: {seconds: 2},
    })
      .then(r => {
        console.log({r}, 'result');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClick = () => {
    console.log('KK');
    schedulePushNotification();
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor,
        height: '100%',
      }}>
      <Button title="Test notification" onPress={handleClick} />
      <AddTimeZone />
      <LocalTime timeZone={timeZone} currentTime={currentTime} />
      <View>
        {myCities.map((city: AvailableCity) => (
          <TimeZoneSection key={city} city={city} title={city} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
