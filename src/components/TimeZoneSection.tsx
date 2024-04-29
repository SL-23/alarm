import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomSheet, BottomSheetRef} from 'react-native-sheet';
import AddAlarmSheetContent from './AddAlarmSheetContent';
import Stack from './core/Stack';
import MyTimeZonesContext from '../context/MyTimeZonesContext';

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
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [touchStartPos, setTouchStartPos] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const {removeMyTimeZone} = useContext(MyTimeZonesContext);
  return (
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
      style={styles.sectionContainer}>
      <Stack style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{timeZoneName}</Text>
      </Stack>
      <Text style={styles.sectionDescription}>{formattedTimeArr[0]}</Text>
      <TouchableOpacity
        style={{
          width: 36,
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          bottomSheetRef.current?.show();
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

      <View>
        <BottomSheet colorScheme="dark" ref={bottomSheetRef} height={580}>
          <AddAlarmSheetContent
            timeZone={timeZone}
            onClose={() => bottomSheetRef.current?.hide()}
            onSave={() => bottomSheetRef.current?.hide()}
          />
        </BottomSheet>
      </View>
      {showDelete && (
        <Button title="DEL" onPress={() => removeMyTimeZone(timeZone)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 32,
    marginHorizontal: 8,
    justifyContent: 'space-between',
  },
  titleContainer: {
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
});

export default TimeZoneSection;
