import {
  Button,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import TimeSpectrum from './TimeSpectrum';
import {useState} from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface InputFieldsProps {
  timeZone: string;
  onClose: () => void;
  onSave: () => void;
}

const InputFields = ({timeZone, onClose}: InputFieldsProps) => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [amOrPm, setAmOrPm] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [notificationId, setNotificationId] = useState('none');
  const scheduleNotificationsHandler = async () => {
    console.log(notificationId);
    if (notificationId === 'none') {
      var newHour = parseInt(hour);
      if (amOrPm === 'pm') {
        newHour = newHour + 12;
      }
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alarm',
          body: 'It is time to wake up!',
          data: {data: 'Your morning alarm data'},
        },
        trigger: {
          hour: newHour,
          minute: parseInt(minute),
          repeats: repeat,
        },
      });
      setAmOrPm('');
      setHour('');
      setMinute('');
      console.log(identifier, 'succeed');
      setNotificationId(identifier);
      onClose();
      // storeData(identifier);
    } else {
      console.log(notificationId);
      console.log('not working');
    }
  };

  const onSave = () => {
    scheduleNotificationsHandler();
  };
  return (
    <View style={{display: 'flex', alignItems: 'center'}}>
      <View style={styles.headerContainer}>
        <Button color="orange" title="Cancel" onPress={onClose} />
        <Text style={{color: 'white', fontWeight: '600'}}>
          Add alarm at {timeZone}
        </Text>
        <Button color="orange" title="Save" onPress={onSave} />
      </View>
      <View style={styles.container}>
        <TextInput
          style={{color: 'white', fontSize: 24}}
          value={hour}
          placeholder="Hour"
          onChangeText={text => setHour(text)}
        />
        <TextInput
          style={{color: 'white', fontSize: 24}}
          value={minute}
          placeholder="minutes"
          onChangeText={text => setMinute(text)}
        />
        <TextInput
          style={{color: 'white', fontSize: 24}}
          value={amOrPm}
          placeholder="am/pm"
          onChangeText={text => setAmOrPm(text)}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 4,
          gap: 8,
        }}>
        <Text style={{color: !repeat ? 'gray' : 'white', fontSize: 24}}>
          Repeat
        </Text>
        <Switch value={repeat} onChange={() => setRepeat(!repeat)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default InputFields;
