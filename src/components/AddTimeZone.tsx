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
import {cityTimezoneMap} from './staticCityTimezoneMap';
import MyCitiesContext, {AvailableCity} from '../context/MyCitiesContext';
import Sheet from './core/Sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTimeZone = () => {
  const [inputText, setInputText] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const cities = Object.keys(cityTimezoneMap);
  const [cityOptions, setCityOptions] = useState<string[]>(cities);
  const [selectedCity, setSelectedCity] = useState('');
  const {myCities} = useContext(MyCitiesContext);

  const storeData = async (value: {city: string; timezone: string}) => {
    try {
      await AsyncStorage.setItem(value.city, value.timezone);
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
            Selected {selectedCity}
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
            {cityOptions.slice(0, 8).map(city => (
              <Button
                color="orange"
                title={city}
                key={city}
                onPress={() => {
                  if (Object.keys(myCities).includes(city)) {
                    Alert.alert('TimeZone exists', 'Select another one');
                  } else {
                    setSelectedCity(city);
                    console.log({city}, cityTimezoneMap[city as AvailableCity]);
                    setSheetOpen(false);
                    storeData({
                      city,
                      timezone: cityTimezoneMap[city as AvailableCity],
                    });
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
