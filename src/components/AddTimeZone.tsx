import {useContext, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {availableTimeZones} from './availableTimeZones';
import SheetHeader from './SheetHeader';
import MyTimeZonesContext from '../context/MyTimeZonesContext';

const AddTimeZone = () => {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [timeZoneOptions, setTimezoneOptions] = useState(availableTimeZones);
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const {addMyTimeZone} = useContext(MyTimeZonesContext);
  return (
    <View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setModalVisible(true);
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
        <Modal transparent={true} visible={modalVisible}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '80%',
              backgroundColor: '#1f1f1f',
              borderRadius: 16,
              padding: 32,
            }}>
            <SheetHeader
              onClose={() => setModalVisible(false)}
              onSave={() => {
                setModalVisible(false);
                addMyTimeZone(selectedTimeZone);
              }}
              heading="Add a timezone"
            />
            <Text>Selected {selectedTimeZone}</Text>
            <TextInput
              style={{fontSize: 18, color: 'white'}}
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
              {timeZoneOptions.map(option => (
                <Button
                  color="orange"
                  title={option}
                  key={option}
                  onPress={() => setSelectedTimeZone(option)}
                />
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default AddTimeZone;
