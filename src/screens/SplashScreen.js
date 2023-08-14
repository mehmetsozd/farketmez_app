import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default function SplashScreen({ }) {
 const backgroundImage = require('../assets/images/splash.png');

 return (
  <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.container}>
   <Text style={styles.title}>fark{'\n'}etmez</Text>
  </ImageBackground>
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
