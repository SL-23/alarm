import {colorHelper} from '../components/core/theme';

export const getBackgroundColor = (currentTime: string) => {
  const currentHour = currentTime.split(':')[0];
  return colorHelper(
    parseInt(currentHour) < 6 || parseInt(currentHour) > 18 ? 'black' : 'white',
  );
};

export const getTextColor = (currentTime: string) => {
  const currentHour = currentTime.split(':')[0];
  return colorHelper(
    parseInt(currentHour) < 6 || parseInt(currentHour) > 18 ? 'white' : 'black',
  );
};
