import {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface InlineProps extends PropsWithChildren {
  style?: ViewStyle;
}
const Inline = ({children, style}: InlineProps) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      ...style,
    }}>
    {children}
  </View>
);

export default Inline;
