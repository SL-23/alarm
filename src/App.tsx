import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './screens/Home';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: 'darker',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Home />
    </SafeAreaView>
  );
}

export default App;
