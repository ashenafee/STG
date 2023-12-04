import React from 'react';
import { useContext } from 'react';
import { Text, Pressable, Image } from 'react-native';

import { LoginContext } from '../contexts/AppContext';

import type { StyleProp, ViewStyle, ImageStyle, TextStyle, ImageSourcePropType } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface ThirdPartyButtonProps {
    style?: StyleProp<ViewStyle>,
    logo: ImageSourcePropType,
    brand: string,
    logoStyle?: StyleProp<ImageStyle>,
    textStyle?: StyleProp<TextStyle>,
    type: 'continue'|'signup',
  }

function ThirdPartyButton({ style = {}, logo, brand, logoStyle = {}, textStyle = {}, type }: ThirdPartyButtonProps) {
    const loginHandler = useContext(LoginContext);
  
    return (
      <Pressable style={[styles.thirdPartyButton, style]} onPress={() => loginHandler(true)}>
        <Image source={logo} style={logoStyle} />
        <Text style={[styles.thirdPartyText, textStyle]}>{type === 'continue' ? "Continue" : "Sign up"} with {brand}</Text>
      </Pressable>
    );
  }

const styles = EStyleSheet.create({
    thirdPartyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderRadius: 50,
        overflow: 'hidden',
      },
      thirdPartyText: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: '0.625rem',
        letterSpacing: '0.05rem',
        fontFamily: 'Roboto-Regular',
      },
});

export default ThirdPartyButton;
