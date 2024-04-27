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
  onSave?: () => void;
  onClose?: () => void;
}

const AddAlarmSheetContent = ({
  timeZone,
  onClose,
  onSave,
}: AddAlarmSheetProps) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.headerContainer}>
        <Button color="orange" title="Cancel" onPress={onClose} />
        <Text style={{color: 'white', fontWeight: '600'}}>
          Add alarm at {timeZone}
        </Text>
        <Button color="orange" title="Save" onPress={onSave} />
      </View>
      <InputFields />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TimeSpectrum />
        <TimeSpectrum />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default AddAlarmSheetContent;
