import {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface StackProps extends PropsWithChildren {
  style?: ViewStyle;
}
const Stack = ({children, style}: StackProps) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...style,
    }}>
    {children}
  </View>
);

export default Stack;
