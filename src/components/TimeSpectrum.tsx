import {ScrollView, Text, View} from 'react-native';
const dayTimeColor = '#ff9500';

const nightTimeColor = '#8e8e93';

const TimeSpectrum = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        backgroundColor: 'white',
        margin: 16,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
      }}>
      {Array.from({length: 12}).map((_, index) => {
        return (
          <View
            style={{
              backgroundColor:
                index === 0
                  ? '#ff9500'
                  : `${dayTimeColor}${(100 - index * 8).toString()}`,
            }}>
            <Text
              style={{
                color: '#6c6c70',
                paddingHorizontal: 4,
                paddingVertical: 2,
              }}>
              {index}
            </Text>
          </View>
        );
      })}

      {Array.from({length: 12}).map((_, index) => (
        <View
          style={{
            backgroundColor:
              index === 0
                ? 'transparent'
                : index === 11
                ? nightTimeColor
                : `${nightTimeColor}${(index * 8).toString()}`,
          }}>
          <Text
            style={{
              color: '#6c6c70',
              paddingHorizontal: 4,
              paddingVertical: 2,
            }}>
            {index + 12}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TimeSpectrum;
