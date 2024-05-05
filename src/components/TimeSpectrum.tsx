import {ScrollView, Text, View} from 'react-native';
const dayTimeColor = '#ff9500';

const nightTimeColor = '#8e8e93';

interface TimeSpectrumProps {
  currentTime: string;
}

const ColorIndex = ({color}: {color: string}) => (
  <View
    style={{width: 16, height: 16, backgroundColor: color, borderRadius: 16}}
  />
);

const TimeSpectrum = ({currentTime}: TimeSpectrumProps) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        margin: 16,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
      }}>
      {Array.from({length: 12}).map((_, index) => {
        return (
          <View
            key={index}
            style={{
              width: 24,
              height: 24,
              borderRadius: 16,
              margin: 2,
              justifyContent: 'center',
              alignItems: 'center',
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
          key={index + 12}
          style={{
            width: 24,
            height: 24,
            borderRadius: 16,
            margin: 2,
            justifyContent: 'center',
            alignItems: 'center',
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
