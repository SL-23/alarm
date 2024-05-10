import React from 'react';
import {StyleSheet, View} from 'react-native';
import Stack from './core/Stack';
import Typography from './core/Typography';
import {getTextColor} from '../helpers/helpers';

const LocalTime = ({
  timeZone,
  currentTime,
}: {
  timeZone: string;
  currentTime: string;
}) => {
  const textColor = getTextColor(currentTime);
  return (
    <View style={styles.sectionContainer}>
      <Stack style={styles.titleContainer}>
        <Typography variant="h1" color={textColor}>
          Local
        </Typography>
        <Typography variant="body" color={textColor}>
          {timeZone}
        </Typography>
      </Stack>
      <Typography variant="large" color={textColor}>
        {currentTime}
      </Typography>
    </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LocalTime;
