import React from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
 const backgroundImage = require('../assets/images/splash.png');

 React.useEffect(() => {
  const timer = setTimeout(() => {
   navigation.navigate('MainScreen');
  }, 750);

  return () => clearTimeout(timer);
 }, [navigation]);

 return (
  <SafeAreaView style={styles.container}>
   <StatusBar backgroundColor={'#000'} />
   <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.container}>
    <Text style={styles.title}>fark{'\n'}etmez</Text>
   </ImageBackground>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#0000009a',
 },
 title: {
  position: 'absolute',
  color: 'white',
  fontFamily: 'VisbyBold',
  fontSize: 35,
  left: 0,
  bottom: 0,
  margin: 25
 },
});
