import {useContext, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {availableTimeZones} from './availableTimeZones';
import MyTimeZonesContext from '../context/MyTimeZonesContext';
import Sheet from './core/Sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTimeZone = () => {
  const [inputText, setInputText] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [timeZoneOptions, setTimezoneOptions] = useState(availableTimeZones);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const {myTimeZones, addMyTimeZone} = useContext(MyTimeZonesContext);
  const [data, setData] = useState('old');

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem(value, value);
    } catch (e) {
      Alert.alert('Error saving timezone', '');
    }
  };

  return (
    <View>
      {/* <Button title="get key" onPress={getData} />
      <Text>{data}</Text> */}
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setSheetOpen(true);
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'orange',
            padding: 16,
          }}>
          Add time zone
        </Text>
      </TouchableOpacity>
      <View>
        <Sheet
          height={600}
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onSave={() => {
            setSheetOpen(false);
          }}
          heading="Add a timezone">
          <Text style={{color: 'white', margin: 16}}>
            Selected {selectedTimeZone}
          </Text>

          <TextInput
            style={{
              fontSize: 18,
              color: 'white',
              borderColor: 'orange',
              borderWidth: 2,
              borderRadius: 16,
              margin: 16,
              width: '80%',
              padding: 8,
            }}
            placeholder="Search"
            value={inputText}
            onChangeText={text => {
              setInputText(text);
              setTimezoneOptions(
                availableTimeZones.filter(option =>
                  option.toLowerCase().includes(text.toLowerCase()),
                ),
              );
            }}
          />
          <ScrollView>
            {timeZoneOptions.slice(0, 8).map(option => (
              <Button
                color="orange"
                title={option}
                key={option}
                onPress={() => {
                  if (myTimeZones.find(zone => zone === option)) {
                    Alert.alert('Timezone exists', 'Select another one');
                  } else {
                    setSelectedTimeZone(option);
                    addMyTimeZone(option);
                    setSheetOpen(false);
                    storeData(option);
                  }
                }}
              />
            ))}
          </ScrollView>
        </Sheet>
      </View>
    </View>
  );
};

export default AddTimeZone;
