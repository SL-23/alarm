import {ScrollView, View} from 'react-native';
import TimeSpectrum from './TimeSpectrum';
import InputFields from './InputFields';

interface AddAlarmSheetProps {
  timeZone: string;
  onSheetClose: () => void;
  locationTime: string;
}

const AddAlarmSheetContent = ({
  timeZone,
  onSheetClose,
  locationTime,
}: AddAlarmSheetProps) => {
  const localTime = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as Intl.DateTimeFormatOptions;

  const formatter = new Intl.DateTimeFormat([], options);

  const formattedLocalTime = formatter.format(localTime).split(' ')[0];

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <InputFields timeZone={timeZone} onSheetClose={onSheetClose} />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TimeSpectrum currentTime={formattedLocalTime} />
        <TimeSpectrum currentTime={locationTime} />
      </View>
    </ScrollView>
  );
};

export default AddAlarmSheetContent;
