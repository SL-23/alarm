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
  onClose: () => void;
  onSave: () => void;
}

const AddAlarmSheetContent = ({
  timeZone,
  onClose,
  onSave,
}: AddAlarmSheetProps) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <InputFields timeZone={timeZone} onClose={onClose} onSave={onSave} />
      {/* <View style={{display: 'flex', flexDirection: 'row'}}>
        <TimeSpectrum />
        <TimeSpectrum />
      </View> */}
    </ScrollView>
  );
};

export default AddAlarmSheetContent;
