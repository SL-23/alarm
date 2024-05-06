import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AddAlarmSheetContent from './AddAlarmSheetContent';
import Stack from './core/Stack';
import MyTimeZonesContext from '../context/MyTimeZonesContext';
import Sheet from './core/Sheet';
import Inline from './core/Inline';

const backgroundColorArr = [
  '#F8F9F9',
  '#F7F8F8',
  '#F6F7F7',
  '#F5F6F6',
  '#F4F5F5',
  '#F3F4F4',
  '#F2F3F3',
  '#F1F2F2',
  '#F0F1F1',
  '#EFEFEF',
  '#E0E0E0',
  '#D1D1D1',
  '#C2C2C2',
  '#B3B3B3',
  '#A4A4A4',
  '#959595',
  '#868686',
  '#777777',
  '#727171',
  '#656565',
  '#5A5959',
  '#4F4F4F',
  '#454545',
  '#3E3E3E',
  '#3A3939',
];

interface SectionProps {
  title: string;
  timeZone: string;
}

const TimeZoneSection = ({title, timeZone}: SectionProps) => {
  const dateInformation = new Date();
  const [locationTime, setLocationTime] = useState(dateInformation);

  const options = {
    timeZone: timeZone,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'longOffset',
    hour12: false,
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
  const [touchStartPos, setTouchStartPos] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {removeMyTimeZone} = useContext(MyTimeZonesContext);
  console.log();
  const currentHour = formattedTimeArr[0].split(':')[0];
  const backgroundColor = backgroundColorArr[parseInt(currentHour)];
  return (
    <>
      <View
        onMoveShouldSetResponder={() => {
          return true;
        }}
        onTouchStart={e => {
          setTouchStartPos(e.nativeEvent.pageX);
        }}
        onTouchEnd={e => {
          const touchEndPos = e.nativeEvent.pageX;
          if (touchEndPos < touchStartPos) {
            setShowDelete(true);
          } else {
            setShowDelete(false);
          }
        }}
        style={{...styles.sectionContainer, backgroundColor: backgroundColor}}>
        <Stack style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{timeZoneName}</Text>
        </Stack>
        <Inline style={{gap: 16}}>
          <Text style={styles.sectionDescription}>{formattedTimeArr[0]}</Text>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setIsSheetOpen(true);
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
        </Inline>

        {showDelete && title !== 'Local' && (
          <Button title="DEL" onPress={() => removeMyTimeZone(timeZone)} />
        )}
      </View>
      <View>
        <Sheet
          open={isSheetOpen}
          heading={`Add alarm at ${timeZone}`}
          height={800}
          onClose={() => setIsSheetOpen(false)}
          onSave={() => setIsSheetOpen(false)}>
          <AddAlarmSheetContent
            locationTime={formattedTimeArr[0]}
            timeZone={timeZone}
            onSheetClose={() => setIsSheetOpen(false)}
          />
        </Sheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
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
});

export default TimeZoneSection;
