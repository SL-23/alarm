import {
  Button,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TimeSpectrum from './TimeSpectrum';
import InputFields from './InputFields';

interface AddAlarmSheetProps {
  timeZone: string;
  onSheetClose: () => void;
}

const AddAlarmSheetContent = ({timeZone, onSheetClose}: AddAlarmSheetProps) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <InputFields timeZone={timeZone} onSheetClose={onSheetClose} />
      {/* <View style={{display: 'flex', flexDirection: 'row'}}>
        <TimeSpectrum />
        <TimeSpectrum />
      </View> */}
    </ScrollView>
  );
};

export default AddAlarmSheetContent;
