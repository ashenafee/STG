import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, Image, Dimensions, ScrollView, Modal, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Screen from '../components/Screen';
import { CircularProgress } from 'react-native-progress-circle-gradient';
import Button from '../components/Button';

const HistoryEntry = () => {
  const thumbnail = require('../assets/thumbnails/daily_bread_food_bank.png');
  return (
    <View style={styles.entry}>
      <Image source={thumbnail} style={styles.entryThumbnail} />
      <View style={styles.entryBody}>
        <Text style={styles.entryAccountName}>Daily Bread Food Bank</Text>
        <View style={styles.timeContainer}>
          <Button center='v' disabled={true} style={styles.timeItem}>
            <Image source={require('../assets/calendar.png')} style={styles.timeIcon} />
            <Text style={styles.timeText}>1 dec 2023</Text>
          </Button>
          <Button center='v' disabled={true} style={styles.timeItem}>
            <Image source={require('../assets/clock.png')} style={styles.timeIcon} />
            <Text style={styles.timeText}>3:45 pm</Text>
          </Button>
        </View>
        <Text style={styles.summary}>Donation: non-perishable food items</Text>
      </View>
      <Image source={require('../assets/history_check.png')} style={styles.historyCheck} />
    </View>
  );
}

function HistoryScreen({ navigation }) {
  const [text, setText] = useState('300');
  const [goal, setGoal] = useState(300);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(100);
  const circleRadius = Dimensions.get("screen").width * 0.633 / 2;
  const [dropdownDisplay, setDropdownDisplay] = useState(false);

  return (
    <Screen style={styles.screen}>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log(`Goal set to ${goal}`);
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalTitle}>Edit Goal</Text>
            <View style={styles.inputContainer}>
              <TextInput
              style={styles.modalInput}
                onChangeText={setText}
                keyboardType='number-pad'
                enterKeyHint='done'
              />
            </View>
            <Button
              center='v'
              style={styles.modalDone}
              onPress={() => {setGoal(Number(text)); console.log('closing modal'); setModalVisible(false);}}>
              <Text style={styles.modalDoneText}>Done</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.profileThumbnailContainer} onPress={() => navigation.navigate("ProfileScreen")}>
        <Image source={require('../assets/profile_pic.png')} style={styles.profilePic} />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Activity </Text>
        <Image source={require('../assets/trophy.png')} style={styles.trophy} />
      </View>
      <Text style={styles.subtitle}>{'\u2026'}in a nutshell.</Text>
      <ScrollView style={styles.bodyContainer} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.circleContainer}>
          {/* <View style={[styles.circleShadow, { width: circleRadius * 2 }]} /> */}
          <CircularProgress
            backgroundColor={EStyleSheet.value('$pageBackgroundColor')}
            radius={circleRadius}
            strokeWidth={15}
            percentageComplete={currentProgress / goal * 100}
            colors={['rgba(252, 129, 58, 0)', '#D31823', '#FFD43D', '#FFD43D']}
          />
          <Text style={styles.goalNumber}>{Math.round(currentProgress / goal * 100)}%</Text>
          <Text style={styles.goalCaption}>of goal reached</Text>
          <Button shadow={true} center='vh' style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/edit_pencil.png')} style={styles.editImage} />
          </Button>
        </View>
        <Text style={[styles.progressMarker, styles.top]}>$0</Text>
        <Text style={[styles.progressMarker, styles.right]}>${goal / 4}</Text>
        <Text style={[styles.progressMarker, styles.bottom]}>${goal / 4 * 2}</Text>
        <Text style={[styles.progressMarker, styles.left]}>${goal / 4 * 3}</Text>
        <View style={styles.logContainer}>
          <Image source={require('../assets/credit_card.png')} style={styles.creditCard} />
          <Text style={styles.prompt}>recently donated?</Text>
          <Button center='vh' transparentShadow={true} style={styles.logButton}>
            <Image source={require('../assets/log_plus.png')} style={styles.logPlus} />
            <Text style={styles.logText}>log activity</Text>
          </Button>
          <Image source={require('../assets/books.png')} style={styles.books} />
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Previous Donations</Text>
          <Button center='v' style={styles.dropdownButton} onPress={() => setDropdownDisplay(!dropdownDisplay)}>
            <Text style={styles.dropdownText}>2023</Text>
            <Image source={require('../assets/expand_arrow.png')} style={styles.dropdownArrow} />
          </Button>
          <Button center='vh' style={[styles.dropdownField, { display: dropdownDisplay ? 'flex' : 'none' }]} disabled={true}>
            <Text style={styles.dropdownText}>2023</Text>
          </Button>
          <View style={styles.entryContainer}>
            <HistoryEntry />
            <HistoryEntry />
            <HistoryEntry />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = EStyleSheet.create({
  screen: {
    paddingHorizontal: '5.6%',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    width: '80%',
    height: undefined,
    aspectRatio: 16 / 10,
    borderRadius: 20,
    backgroundColor: 'rgba(252, 250, 248, 1)',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'Kumbh Sans-SemiBold',
    fontSize: '1rem',
    letterSpacing: '0.09rem',
    color: '$emphTextColor'
  },
  modalDone: {
    height: '18%',
    borderRadius: 50,
    backgroundColor: '$emphTextColor',
  },
  inputContainer: {
    width: '80%',
    height: '2.125rem',
    backgroundColor: '#EFECE9',
        borderRadius: 50,
        paddingHorizontal: '1.1rem',
        justifyContent: 'center',
        alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    flex: 1,
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: '0.05rem',
    color: 'black',
    fontSize: '1rem',
    textAlign: 'center',
  },
  modalDoneText: {
    fontFamily: 'Kumbh Sans-Regular',
    fontSize: '0.825rem',
    color: 'white',
    marginHorizontal: '0.5rem',
    letterSpacing: '0.04rem'
  },
  profileThumbnailContainer: {
    position: 'absolute',
    right: 0,
    top: '4.8%',
    backgroundColor: '#C2D1D9',
    width: '29.48%',
    height: '10.23%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    paddingLeft: '4.12%',
  },
  profilePic: {
    borderRadius: 100,
    height: '86.2%',
    width: undefined,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: '5.8%',
    marginTop: '17%',
  },
  title: {
    fontFamily: 'Kumbh Sans-SemiBold',
    fontSize: '1.125rem',
    letterSpacing: '0.09rem',
    color: '$emphTextColor'
  },
  trophy: {
    width: '1rem',
    height: '1rem',
  },
  subtitle: {
    fontFamily: 'Ubuntu-LightItalic',
    fontSize: '0.625rem',
    letterSpacing: '0.05rem',
    color: '$textColor',
    alignSelf: 'flex-start',
    marginLeft: '5.8%',
    marginTop: '3%',
  },
  bodyContainer: {
    marginTop: '4%',
    marginHorizontal: -30,
    marginBottom: -30,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 30, // must be negative of scrollViewStyle marginBottom above for bottom shadow to show
    paddingHorizontal: 30, // see ^
  },
  circleContainer: {
    marginTop: '1.2rem'
  },
  circleShadow: {
    position: 'absolute',
    top: 0,
    height: undefined,
    aspectRatio: 1,
    backgroundColor: '$pageBackgroundColor',
    borderRadius: 500,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.5,
    elevation: 15,
    zIndex: -1000,
  },
  goalNumber: {
    position: 'absolute',
    top: '27.22%',
    fontFamily: 'MPLUS Rounded 1c-Regular',
    fontSize: '2.1875rem',
    letterSpacing: '0.175rem',
    color: '$emphTextColor',
    zIndex: 1000,
    alignSelf: 'center',
  },
  goalCaption: {
    position: 'absolute',
    top: '51.04%',
    fontFamily: 'Kumbh Sans-Medium',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
    color: '$emphTextColor',
    alignSelf: 'center',
  },
  progressMarker: {
    color: '$emphTextColor',
    fontFamily: 'Kumbh Sans-Regular',
    fontSize: '0.625rem',
    letterSpacing: '0.05rem',
  },
  top: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  right: {
    position: 'absolute',
    top: '18%',
    right: '14%',
  },
  bottom: {
    position: 'absolute',
    top: "36%",
  },
  left: {
    position: 'absolute',
    top: '18%',
    left: '11%'
  },
  editButton: {
    width: '13%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    position: 'absolute',
    top: '66%',
    alignSelf: 'center',
    backgroundColor: '$pageBackgroundColor',
  },
  editImage: {
    height: '66.66%',
    width: undefined,
    aspectRatio: 1,
  },
  logContainer: {
    marginTop: '13.76%',
    width: '100%',
    borderRadius: 35,
    backgroundColor: '#E1ECF2',
    height: undefined,
    aspectRatio: 292 / 119,
  },
  creditCard: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '118%',
    width: undefined,
    aspectRatio: 266 / 278,
    borderBottomRightRadius: 35
  },
  prompt: {
    position: 'absolute',
    top: '10.76%',
    left: '6.52%',
    fontFamily: 'Ubuntu-RegularItalic',
    fontSize: '0.5625rem',
    letterSpacing: '0.03375rem',
    color: '$textColor',
  },
  logButton: {
    position: 'absolute',
    top: '28.64%',
    left: '6.52%',
    backgroundColor: '#E1ECF2',
    buttonColor: 'rgba(255, 255, 255, 0.70)',
    width: '42.47%',
    height: '30.25%',
    borderRadius: 50
  },
  logPlus: {
    height: '55.55%',
    width: undefined,
    aspectRatio: 1,
  },
  logText: {
    color: '$emphTextColor',
    fontFamily: 'Kumbh Sans-SemiBold',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
  },
  books: {
    position: 'absolute',
    left: '14.03%',
    bottom: 0,
    height: '49.58%',
    width: undefined,
    aspectRatio: 240 / 178,
  },
  historyContainer: {
    width: '100%',
    marginTop: '6.88%',
  },
  historyTitle: {
    fontFamily: 'Kumbh Sans-SemiBold',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
    color: '$emphTextColor',
    alignSelf: 'flex-start'
  },
  dropdownButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '$pageBackgroundColor',
    borderRadius: 50,
    borderWidth: 0.6,
    borderColor: '$gray',
    height: '1.3125rem',
    paddingHorizontal: '0.5rem',
  },
  dropdownField: {
    position: 'absolute',
    top: '7.5%',
    right: 0,
    backgroundColor: '$pageBackgroundColor',
    borderRadius: 50,
    borderWidth: 0.6,
    borderColor: '$gray',
    height: '1.3125rem',
    width: '3rem',
    paddingHorizontal: '0.5rem',
  },
  dropdownText: {
    fontFamily: 'Kumbh Sans-Medium',
    fontSize: '0.5rem',
    letterSpacing: '0.04rem',
    color: '$emphTextColor',
  },
  dropdownArrow: {
    height: '47.62%',
    width: undefined,
    aspectRatio: 1,
    marginLeft: '0.2rem'
  },
  entryContainer: {
    width: '100%',
    gap: '0.6rem',
    marginTop: '5.94%',
    marginBottom: '3%',
  },
  entry: {
    width: '100%',
    height: undefined,
    aspectRatio: 4.5477,
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: '$pageBackgroundColor',
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    elevation: 3,
  },
  entryThumbnail: {
    height: '65.26%',
    width: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    alignSelf: 'center',
    marginLeft: '2.5%',
  },
  entryBody: {
    flex: 1,
    marginLeft: '4.64%',
    paddingVertical: '3.8%',
    justifyContent: 'space-between',
  },
  entryAccountName: {
    fontFamily: 'Kumbh Sans-SemiBold',
    fontSize: '0.625rem',
    color: '$emphTextColor',
    letterSpacing: '0.05rem',
  },
  timeContainer: {
    flexDirection: 'row',
    height: '0.85rem',
    gap: '0.8rem',
  },
  summary: {
    fontFamily: 'Ubuntu-LightItalic',
    fontSize: '0.5rem',
    letterSpacing: '0.04rem',
    color: '$textColor',
  },
  historyCheck: {
    height: '31.15%',
    width: undefined,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: '5%',
  },
  timeItem: {
    height: '100%',
  },
  timeIcon: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    marginRight: '0.2rem'
  },
  timeText: {
    color: '$gray',
    fontFamily: 'Kumbh Sans-Medium',
    fontSize: '0.5rem',
    letterSpacing: '0.04rem',
  }
});

export default HistoryScreen;
