import {NavigationAction, NavigationProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface SectionProps {
  title: string;
  timeZone: string;
  navigation: any;
}

const TimeZoneSection = ({title, timeZone, navigation}: SectionProps) => {
  const dateInformation = new Date();
  const [locationTime, setLocationTime] = useState(dateInformation);

  const options = {
    timeZone: timeZone,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'longOffset',
  } as Intl.DateTimeFormatOptions;
  const formatter = new Intl.DateTimeFormat([], options);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocationTime(new Date()), 600000;
    });
    return () => clearInterval(timer);
  }, []);

  const formattedTimeArr = formatter.format(locationTime).split(' ');
  const timeZoneName = formattedTimeArr.slice(1).join(' ');
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{timeZoneName}</Text>
      </View>
      <Text style={styles.sectionDescription}>{formattedTimeArr[0]}</Text>
      <TouchableOpacity
        style={{
          width: 36,
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('SetAlarm');
        }}>
        <Image
          style={{
            width: 36,
            height: 36,
            resizeMode: 'cover',
          }}
          source={require('../../resources/icons/plug.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 32,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginRight: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: 'white',
  },
  sectionDescription: {
    color: 'white',
    fontSize: 48,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TimeZoneSection;
