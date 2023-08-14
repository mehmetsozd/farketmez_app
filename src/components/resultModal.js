import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { windowHeight, windowWidth } from '../global';

const ResultModal = ({ modalVisible, setModalVisible, result }) => {

 const closeModal = () => {
  setModalVisible(false);
 };


 return (
  <Modal
   animationType="fade"
   transparent
   visible={modalVisible}
   onRequestClose={closeModal}
  >
   <View style={styles.ModalBackground}>
    <Image
     source={require('../assets/images/splash.png')}
     style={styles.backgroundImage}
    />
    <Text style={styles.result}>{result}</Text>
    <TouchableOpacity activeOpacity={0.9} onPress={closeModal} style={styles.closeButton}>
     <Text style={{ color: 'white', fontSize: windowWidth * .06 }}>X</Text>
    </TouchableOpacity>
   </View>
  </Modal>
 );
};

const styles = StyleSheet.create({
 result: {
  fontSize: 32,
  fontFamily: 'VisbyBold',
  color: 'white',
 },
 ModalBackground: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
 },
 backgroundImage: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
 },
 closeButton: {
  position: 'absolute',
  bottom: windowHeight * .1,
  borderRadius: windowWidth * .05,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: windowWidth * .1,
  height: windowWidth * .1,
  alignItems: 'center',
  justifyContent: 'center'
 }
});

export default ResultModal;
