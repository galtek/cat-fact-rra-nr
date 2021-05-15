import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScrollViewCats from './components/ScrollView';
import FlatListCat from './components/FlatListCat';
import CatDetails from './components/CatDetails';
import Metrics from './components/Metrics';

const { Navigator, Screen } = createStackNavigator();


global.NETWORK_TIME_ACCUM = 0;

export default function App() {
  return (
    // <FlatListCat />
    <NavigationContainer>
      <Navigator>
        
        <Screen name="Home" component={FlatListCat} options={{ title: "Home" }} />
        <Screen name="CatDetails" component={CatDetails} options={{ title: "Details" }}/>
        <Screen name="Metrics" component={Metrics} options={{ title: "Metrics" }} />
        
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
