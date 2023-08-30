import React, { useState } from 'react';
import {
 ImageBackground,
 Text,
 StyleSheet,
 SafeAreaView,
 View,
 Image,
 TouchableWithoutFeedback,
 FlatList,
 TouchableOpacity,
 TextInput,
 ScrollView
} from 'react-native';
import { windowHeight, windowWidth } from '../global';
import FlipCard from '../components/FlipCoin/FlipCard';
import LinearGradient from 'react-native-linear-gradient';
import ResultModal from '../components/resultModal';

function MainScreen({ navigation }) {
 const backgroundImage = require('../assets/images/mainbg.png');
 const [selectedView, setSelectedView] = useState(0);

 const fakeData = [
  { id: 1, text: 'Seçenek 1' },
  { id: 2, text: 'Seçenek 2' },
  { id: 3, text: 'Seçenek 3' },
  { id: 4, text: 'Seçenek 4' },
  { id: 5, text: 'Seçenek 5' },
 ];

 const [editingItemId, setEditingItemId] = useState(null);
 const [options, setOptions] = useState(fakeData);
 const [editedText, setEditedText] = useState("Seçenek");
 const [resultModalVisible, setResultModalVisible] = React.useState(false);
 const [result, setResult] = useState(null);


 const handleEditPress = (itemId) => {
  setEditingItemId(itemId);
 };

 const handleSelection = () => {
  if (selectedView == 0) {
   setSelectedView(1);
  } else {
   setSelectedView(0);
  }
 };

 const handleSavePress = (itemId, newText) => {
  const updatedOptions = options.map(option => {
   if (option.id === itemId) {
    return { ...option, text: newText };
   }
   return option;
  });
  setOptions(updatedOptions);
  setEditingItemId(null);
 };

 const handleFarketmez = () => {
  const interval = 100;
  const totalDuration = 3000;
  const delayToShowResultModal = 750; // Half a second delay
  const numIterations = totalDuration / interval;

  let currentIteration = 0;
  let selectedOptionText = null;

  const intervalId = setInterval(() => {
   const randomIndex = Math.floor(Math.random() * options.length);

   const updatedOptions = options.map((option, index) => {
    if (index === randomIndex) {
     selectedOptionText = option.text;
     return { ...option, selected: true };
    } else {
     return { ...option, selected: false };
    }
   });
   setOptions(updatedOptions);
   currentIteration++;
   if (currentIteration === numIterations) {
    clearInterval(intervalId);
    setEditingItemId(null);
    setTimeout(() => {
     setResultModalVisible(true);
     setResult(selectedOptionText);
    }, delayToShowResultModal);
   }
  }, interval);
 };







 return (
  <>
   <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.container}>
    <SafeAreaView style={{ flex: 1, paddingRight: 15, paddingLeft: 15, justifyContent: 'space-between' }}>
     <View style={styles.topRow}>
      <View>
       <Text style={styles.title}>harbiden</Text>
       <Text style={styles.title2}>Fark Etmez.</Text>
      </View>
      <Image style={{ width: windowWidth * .075 }} resizeMode='contain' source={require('../assets/images/menu.png')} />
     </View>
     {selectedView == 0 &&
      (
       <ScrollView style={styles.mainView}>
        <FlatList
         scrollEnabled={false}
         showsVerticalScrollIndicator={false}
         style={{ marginTop: 20, marginBottom: 50 }}
         data={options}
         renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => { handleEditPress(item.id) }} >
           <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(255, 255, 255, 0.4)', 'transparent']}
            style={[
             styles.optionButton,
             item.selected && styles.editingOption,
            ]}
           >
            <TextInput
             style={styles.optionText}
             value={editingItemId === item.id ? editedText : item.text}
             onChangeText={(newText) => setEditedText(newText)}
             onSubmitEditing={() => handleSavePress(item.id, editedText)}
             editable={editingItemId === item.id}
            />
           </LinearGradient>

          </TouchableWithoutFeedback>
         )}
         ListFooterComponent={() => (
          <Text style={{ color: 'white', fontSize: 25, alignSelf: 'center', marginTop: 20 }}>+</Text>
         )}
        />
        <TouchableWithoutFeedback onPress={() => { handleFarketmez() }}>
         <View style={styles.listFooter}>
          <Text style={[styles.selectedText, { color: 'black' }]} >Fark Etmez</Text>
         </View>
        </TouchableWithoutFeedback>
       </ScrollView>
      )
     }
     {selectedView == 1 &&
      (
       <View style={styles.headsOrNails}>
        <FlipCard

         friction={6}
         onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
        >
         <Image style={{ height: windowHeight * .25 }} resizeMode='contain' source={require('../assets/images/nails.png')}></Image>
         <Image style={{ height: windowHeight * .25 }} resizeMode='contain' source={require('../assets/images/heads.png')}></Image>
        </FlipCard>
        <Text style={{ fontSize: 18, alignSelf: 'center', color: 'white', fontFamily: 'VisbyBold', marginTop: 30 }}>hey</Text>
       </View>
      )
     }
     <View style={styles.changeView}>
      <TouchableWithoutFeedback onPress={() => {
       if (selectedView == 0) {
       } else {
        handleSelection();
       }
      }
      }>
       <View style={selectedView == 0 ? styles.selectedView : styles.unSelectedView}>
        <Text style={selectedView == 0 ? styles.selectedText : styles.unSelectedText}>Çark</Text>
       </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
       if (selectedView == 1) {
       } else {
        handleSelection();
       }
      }
      }>
       <View style={selectedView == 1 ? styles.selectedView : styles.unSelectedView}>
        <Text style={selectedView == 1 ? styles.selectedText : styles.unSelectedText}>Yazı Tura</Text>
       </View>
      </TouchableWithoutFeedback>
     </View>
    </SafeAreaView>
   </ImageBackground >
   <ResultModal
    modalVisible={resultModalVisible}
    setModalVisible={setResultModalVisible}
    result={result}
   >

   </ResultModal>
  </>
 );
}

export default MainScreen;


const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 title: {
  color: 'white',
  fontFamily: 'VisbyBold',
  fontSize: 20,
 },
 title2: {
  color: 'white',
  fontFamily: 'VisbyBold',
  fontSize: 24,
 },
 topRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
 },
 headsOrNails: {
  height: windowHeight * .3,
  alignItems: 'center'
 },
 changeView: {
  marginBottom: 25,
  alignSelf: 'center',
  height: windowHeight * .075,
  width: windowWidth * .8,
  flexDirection: 'row',
  backgroundColor: '#383838',
  borderRadius: 13,
  alignItems: 'center',
  justifyContent: 'space-evenly'
 },
 selectedView: {
  backgroundColor: '#262626',
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  height: windowHeight * .05,
  width: windowWidth * .4 - 20,
  borderWidth: 1.5,
  borderColor: 'white'
 },
 selectedText: {
  fontSize: 16,
  color: 'white',
  fontFamily: 'VisbyBold'
 },
 unSelectedView: {
  backgroundColor: '#4E4E4E',
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  height: windowHeight * .05,
  width: windowWidth * .4 - 20,
 },
 unSelectedText: {
  fontSize: 16,
  color: '#7A7A7A',
  fontFamily: 'VisbyBold'
 },
 mainView: {
  marginBottom: 50,
  flex: 1,
 },
 listFooter: {
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  width: windowWidth * .8,
  height: windowHeight * .075,
  backgroundColor: 'white',
 },
 optionText: {
  color: '#979797',
  fontSize: 15,
  fontFamily: 'VisbyBold'
 },
 optionButton: {
  marginBottom: 5,
  alignSelf: 'center',
  width: windowWidth * .8,
  alignItems: 'center',
  justifyContent: 'center',
  height: windowHeight * .075,
  borderRadius: 12
 },
 editingOption: {
  borderWidth: 2,
  borderColor: 'white'
 }

});
