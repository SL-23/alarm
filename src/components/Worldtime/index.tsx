// This is to test the world time api :))
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Text, TextInput, View} from 'react-native';

const Worldtime = () => {
  const [city, setCity] = useState<string>('');
  const [localTime, setLocalTime] = useState<string>('Test');
  const [error, setError] = useState<string | null>(null);
  const [validTimezones, setValidTimezones] = useState<string[]>([]);

  const fetchValidTimezones = async () => {
    try {
      const response = await axios.get(
        `https://worldtimeapi.org/api/timezones`,
      );
      setValidTimezones(response.data);
    } catch (err) {
      console.log(`${err}, no valid timezones`);
    }
  };

  useEffect(() => {
    fetchValidTimezones();
  }, []);

  const fetchLocalTime = async (city: string) => {
    try {
      setError(null); // Reset any previous errors
      const response = await axios.get(
        `https://worldtimeapi.org/api/timezone/America/Atlanta`,
      );
      const dateTime = new Date(response.data.datetime);

      const timeString = dateTime.toString();
      setLocalTime(timeString);
    } catch (err) {
      setLocalTime('');
      setError('City not found or invalid timezone format. Please try again.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter city timezone (e.g., Asia/Tokyo)"
        value={city}
        onChangeText={text => {
          setCity(text);
        }}
      />
      <Button title="Get Time" onPress={e => fetchLocalTime(city)} />
      {Boolean(localTime) && city !== '' ? (
        <Text style={{color: 'green'}}>
          The local time in {city} is {localTime}.
        </Text>
      ) : null}
      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
    </View>
  );
};

export default Worldtime;
