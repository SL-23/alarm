import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SetAlarm from './screens/SetAlarm';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  console.log('RUN');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: 'Alarms'}}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="SetAlarm" component={SetAlarm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
