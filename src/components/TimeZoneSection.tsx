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
import {colorHelper} from './core/theme';
import Typography from './core/Typography';

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

  const currentHour = formattedTimeArr[0].split(':')[0];
  const backgroundColor = colorHelper(
    parseInt(currentHour) < 6 || parseInt(currentHour) > 18 ? 'black' : 'white',
  );
  const textColor = colorHelper(
    parseInt(currentHour) < 6 || parseInt(currentHour) > 18 ? 'white' : 'black',
  );
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
          <Typography variant="subtitle" color={textColor}>
            {title.replace('_', ' ')}
          </Typography>
          <Typography variant="body" color={textColor}>
            {timeZoneName}
          </Typography>
        </Stack>
        <Inline style={{gap: 16}}>
          <Typography variant="h1" color={textColor}>
            {formattedTimeArr[0]}
          </Typography>
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
});

export default TimeZoneSection;
