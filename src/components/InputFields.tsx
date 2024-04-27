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
import {useState} from 'react';

interface AddAlarmSheetProps {
  timeZone: string;
  onSave?: () => void;
  onClose?: () => void;
}

const InputFields = () => {
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('0');
  const [amOrPm, setAmOrPm] = useState('am');

  return (
    <View style={styles.container}>
      <TextInput style={{color: 'white'}} value={hour} placeholder="Hour" />
      <TextInput
        style={{color: 'white'}}
        value={minute}
        placeholder="minutes"
      />
      <TextInput
        style={{color: 'white'}}
        value={amOrPm}
        placeholder="am or pm"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default InputFields;
