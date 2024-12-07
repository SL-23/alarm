import {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {cityTimezoneMap} from './staticCityTimezoneMap';
import MyTimeZonesContext from '../context/MyTimeZonesContext';
import Sheet from './core/Sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTimeZone = () => {
  const [inputText, setInputText] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const cities = Object.keys(cityTimezoneMap);
  const [cityOptions, setCityOptions] = useState<string[]>(cities);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const {myTimeZones} = useContext(MyTimeZonesContext);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem(value, value);
    } catch (e) {
      Alert.alert('Error saving timeZone', '');
    }
  };

  return (
    <View>
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
          heading="Add a timeZone">
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
              if (text === '') {
                setCityOptions(cities);
              } else {
                const filtered = cities.filter(option =>
                  option.toLowerCase().includes(text.toLowerCase()),
                );
                setCityOptions(filtered);
              }
            }}
          />
          <ScrollView>
            {cityOptions.slice(0, 8).map(option => (
              <Button
                color="orange"
                title={option}
                key={option}
                onPress={() => {
                  if (myTimeZones.find(zone => zone === option)) {
                    Alert.alert('TimeZone exists', 'Select another one');
                  } else {
                    setSelectedTimeZone(
                      cityTimezoneMap[option as keyof typeof cityTimezoneMap],
                    );
                    setSheetOpen(false);
                    storeData(
                      cityTimezoneMap[option as keyof typeof cityTimezoneMap],
                    );
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
