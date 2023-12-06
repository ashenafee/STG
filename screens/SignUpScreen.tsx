import React from 'react';
import { View, Text, Pressable, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

import Screen from '../components/Screen';
import InputField from '../components/InputField';
import ThirdPartyButton from '../components/ThirdPartyButton';

function SignUpScreen({ navigation }) {

  return (
    <Screen style={styles.screen}>
      <View style={styles.backgroundEllipse} />
      <Image source={require('../assets/signin_leaves.png')} style={styles.signinLeaves} />
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>welcome to <Text style={styles.subtitleEmph}>see the good </Text></Text>
        <Image source={require('../assets/gift.png')} style={styles.subtitleGift} />
      </View>
      <View style={styles.inputContainer}>
        <InputField
          style={styles.inputfield}
          leftIcon={require('../assets/email.png')}
          textInputStyle={styles.emailInput}
          keyboardType='email-address'
          verify={true}
          leftIconAspectRatio={512 / 455}
        />
        <InputField
          style={styles.inputfield}
          leftIcon={require('../assets/username.png')}
          textInputStyle={styles.textInput}
          verify={true}
        />
        <InputField
          style={styles.inputfield}
          leftIcon={require('../assets/password.png')}
          textInputStyle={styles.textInput}
          enterKeyHint='done'
          secureTextEntry={true}
        />
      </View>
      <Pressable style={styles.signUpPosition} onPress={() => navigation.navigate("DemoScreen", { signedin: true })}>
        <LinearGradient style={styles.signUpContainer} colors={['#D31823', '#FFD43D']} start={{ x: 0, y: 0 }} end={{ x: 0.75, y: 3 }} locations={[0.1, 0.8]}>
          <View style={styles.textContainer}>
            <Text style={styles.signUpText}>sign up</Text>
          </View>
        </LinearGradient>
      </Pressable>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.thirdPartyContainer}>
        <ThirdPartyButton
          type='signup'
          style={{ borderWidth: 0.5 }}
          logo={require("../assets/google.png")}
          brand="Google"
          logoStyle={styles.googleLogo}
          textStyle={{ color: 'black' }}
          onPress={() => navigation.navigate("DemoScreen", { signedin: true })}
        />
        <ThirdPartyButton
          type='signup'
          style={{ backgroundColor: '#1877F2' }}
          logo={require("../assets/facebook.png")}
          brand="Facebook"
          logoStyle={styles.googleLogo}
          onPress={() => navigation.navigate("DemoScreen", { signedin: true })}
        />
        <ThirdPartyButton
          type="signup"
          style={{ backgroundColor: 'black' }}
          logo={require("../assets/apple.png")}
          brand="Apple"
          logoStyle={styles.appleLogo}
          onPress={() => navigation.navigate("DemoScreen", { signedin: true })}
        />
      </View>
    </Screen>
  );
}

const styles = EStyleSheet.create({
  screen: {
    backgroundColor: '#E0EBF0',
    overflow: 'hidden',
  },
  backgroundEllipse: {
    position: 'absolute',
    backgroundColor: '$pageBackgroundColor',
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    transform: [
      { scaleX: 1.42 },
      { scaleY: 1.1 }
    ],
    borderRadius: 5000,
    bottom: '18%',
    left: '-57.14%',
    zIndex: -1000
  },
  signinLeaves: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '90%',
    height: undefined,
    aspectRatio: 1236 / 508,
  },
  title: {
    position: 'absolute',
    top: '7.9%',
    fontSize: '1.125rem',
    fontFamily: "Kumbh Sans-SemiBold",
    letterSpacing: '0.09rem',
    color: '$emphTextColor',
  },
  subtitleContainer: {
    position: 'absolute',
    top: '12.29%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: 'Kumbh Sans-Light',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
    color: '$textColor',
  },
  subtitleEmph: {
    fontFamily: 'Kumbh Sans-Bold'
  },
  subtitleGift: {
    height: '1rem',
    width: undefined,
    aspectRatio: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: '18.45%',
    height: '19.57%',
    width: '78.12%',
    justifyContent: 'space-between',
  },
  inputfield: {
    width: '100%',
    height: '2.125rem',
  },
  emailInput: {
    fontFamily: 'Ubuntu-RegularItalic',
    fontSize: '0.625rem',
    letterSpacing: '0.05rem',
    color: '$textColor',
  },
  textInput: {
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: '0.05rem',
    color: 'black',
    fontSize: '0.625rem',
  },
  textContainer: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', //Centered horizontally
    flex: 1,
  },
  signUpPosition: {
    position: 'absolute',
    top: '41.16%',
    width: '29.48%',
    height: '5.68%',
    backgroundColor: '$pageBackgroundColor',
    borderRadius: 50,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  signUpContainer: {
    borderRadius: 50,
    width: '100%',
    height: '100%',
  },
  signUpText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing: '0.125rem',
  },
  dividerContainer: {
    position: 'absolute',
    top: '50%',
    flex: 1,
    flexDirection: 'row',
    width: '83.89%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dividerLine: {
    width: '43.48%',
    borderBottomWidth: 0.5,
    borderColor: '#9A9A9A',
  },
  dividerText: {
    fontFamily: 'Ubuntu-RegularItalic',
    fontSize: '0.625rem',
    color: '#9A9A9A',
    letterSpacing: '0.0375rem',
  },
  thirdPartyContainer: {
    position: 'absolute',
    top: '55%',
    width: '62%',
    height: '21%',
    justifyContent: 'space-between',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: Platform.OS == "ios" ? 12 : 10,
    marginLeft: Platform.OS == "ios" ? 16 : 12,
  },
  appleLogo: {
    height: Platform.OS == "ios" ? 44 : 40,
    width: undefined,
    aspectRatio: 93 / 132,
    marginRight: Platform.OS == "ios" ? 10 : 8,
    marginLeft: Platform.OS == "ios" ? 10 : 8,
  },
});

export default SignUpScreen;
