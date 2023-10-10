import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { AppState, Image, View } from 'react-native';
import * as React from 'react';
import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';


const MainFeedStack = createNativeStackNavigator();

function MainFeedScreen() {
 return (
  <MainFeedStack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false, unmountOnBlur: true }} >
   <MainFeedStack.Screen name="SplashScreen" component={SplashScreen} />
   <MainFeedStack.Screen name="MainScreen" component={MainScreen} />
  </MainFeedStack.Navigator>
 );
}


function HoldingPage({ }) {

 return (
  <NavigationContainer>
   <MainFeedScreen />
  </NavigationContainer>
 );
}

export default HoldingPage;
