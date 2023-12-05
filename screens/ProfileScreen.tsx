import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useContext } from 'react';

import { LoginContext } from '../contexts/AppContext';
import EStyleSheet from 'react-native-extended-stylesheet';
import Screen from '../components/Screen';

function ProfileScreen() {
  const loginHandler = useContext(LoginContext);

  const rightArrow = require('../assets/dropdown_arrow.png');

  return (
    <Screen style={styles.screen}>
      <View style={styles.darkEllipse} />
      <View style={styles.lightEllipse} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile </Text>
        <Image source={require('../assets/fallen_leaf.png')} style={styles.leafTitle} />
      </View>
      <Image source={require('../assets/laurel.png')} style={styles.laurel} />
      <Text style={styles.laurelText}>top donor</Text>
      <View style={styles.bodyContainer}>
        <Image source={require('../assets/profile_pic.png')} style={styles.profilePic} />
        <Image source={require('../assets/feedback.png')} style={styles.feedback} />
        <Image source={require('../assets/share.png')} style={styles.share} />
        <Text style={styles.name}><Text style={styles.firstName}>Ariel</Text> Smith</Text>
        <Text style={styles.email}>ariel.smith@gmail.com</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.settingsEntry}>
            <Image source={require('../assets/manage.png')} style={styles.entryIcon} />
            <Text style={styles.entryText}>manage account</Text>
            <Image source={rightArrow} style={styles.rightArrow} />
          </View>
          <View style={styles.settingsEntry}>
            <Image source={require('../assets/settings.png')} style={styles.entryIcon} />
            <Text style={styles.entryText}>settings</Text>
            <Image source={rightArrow} style={styles.rightArrow} />
          </View>
          <View style={styles.settingsEntry}>
            <Image source={require('../assets/about.png')} style={styles.entryIcon} />
            <Text style={styles.entryText}>about us</Text>
            <Image source={rightArrow} style={styles.rightArrow} />
          </View>
          <View style={styles.settingsEntry}>
            <Image source={require('../assets/faq.png')} style={styles.entryIcon} />
            <Text style={styles.entryText}>faq</Text>
            <Image source={rightArrow} style={styles.rightArrow} />
          </View>
          <Pressable style={styles.settingsEntry} onPress={() => loginHandler(false)}>
            <Image source={require('../assets/logout.png')} style={styles.entryIcon} />
            <Text style={styles.entryText}>log out</Text>
          </Pressable>
        </View>
      </View>
      <Image source={require('../assets/signout_leaves.png')} style={styles.signinLeaves} />
    </Screen>
  );
}

const styles = EStyleSheet.create({
  screen: {
    backgroundColor: '#E0EBF0'
  },
  darkEllipse: {
    position: 'absolute',
    backgroundColor: 'rgba(194, 209, 217, 0.70)',
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    transform: [
      { scaleX: 1.42 },
      { scaleY: 1.1 }
    ],
    borderRadius: 5000,
    bottom: '60%',
    zIndex: -1000
  },
  lightEllipse: {
    position: 'absolute',
    backgroundColor: 'rgba(212, 235, 246, 0.70)',
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    transform: [
      { scaleX: 1.7 },
      { scaleY: 1 }
    ],
    borderRadius: 5000,
    bottom: '57%',
    left: '-130%',
    zIndex: -1000
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
  leafTitle: {
    width: '1rem',
    height: '1rem',
  },
  laurel: {
    position: 'absolute',
    top: '7%',
    right: '15%',
    width: '2.1875rem',
    height: undefined,
    aspectRatio: 1,
  },
  laurelText: {
    position: 'absolute',
    top: '13.1%',
    right: '12%',
    fontFamily: 'Kumbh Sans-Regular',
    color: '$emphTextColor',
    letterSpacing: '0.05rem',
    fontSize: '0.625rem',
  },
  profilePic: {
    position: 'absolute',
    top: '-16.3%',
    width: '32.19%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '$pageBackgroundColor',
    zIndex: 1000,
  },
  feedback: {
    position: 'absolute',
    top: '4.7%',
    left: '5.15%',
    width: '1.3rem',
    height: undefined,
    aspectRatio: 1,
  },
  share: {
    position: 'absolute',
    top: '4.7%',
    right: '5.15%',
    width: '1.3rem',
    height: undefined,
    aspectRatio: 1,
  },
  bodyContainer: {
    width: '88.75%',
    height: '57.63%',
    position: 'absolute',
    top: '24.24%',
    borderRadius: 20,
    backgroundColor: '$pageBackgroundColor',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 0.1,
    elevation: 6,
  },
  name: {
    marginTop: '17.48%',
    fontFamily: 'Kumbh Sans-Light',
    fontSize: '1.0625rem',
    letterSpacing: '0.085rem',
    color: '$textColor',
  },
  firstName: {
    fontFamily: 'Kumbh Sans-Medium',
  },
  email: {
    marginTop: '1%',
    fontFamily: 'Ubuntu-LightItalic',
    fontSize: '0.625rem',
    letterSpacing: '0.05rem',
    color: '$textColor'
  },
  settingsContainer: {
    marginTop: '5%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    borderTopWidth: 0.5,
    borderColor: '#DBDBDB'
  },
  settingsEntry: {
    flexDirection: 'row',
    height: '17%',
    alignItems: 'center',
  },
  entryIcon: {
    height: '67.57%',
    width: undefined,
    aspectRatio: 1,
    marginHorizontal: '9.3%'
  },
  entryText: {
    fontFamily: 'Kumbh Sans-Regular',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
    color: '#3A3A3A',
    marginRight: 'auto',
  },
  rightArrow: {
    height: '40.54%',
    width: undefined,
    aspectRatio: 1,
    marginRight: '9%',
    transform: [
      { 'rotateZ': '-90deg' }
    ]
  },
  signinLeaves: {
    position: 'absolute',
    bottom: '-6%',
    right: 0,
    width: '95%',
    height: undefined,
    aspectRatio: 640 / 222,
  },
});

export default ProfileScreen;
