import React from 'react';
import { useState } from 'react';
import { View, TextInput, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import type { KeyboardTypeOptions, EnterKeyHintType, ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';

const verifiedIcon = require('../assets/verified.png');

interface InputFieldProps {
    style?: StyleProp<ViewStyle>,
    textInputStyle?: StyleProp<TextStyle>,
    leftIconAspectRatio?: number,
    rightIconAspectRatio?: number,
    keyboardType?: KeyboardTypeOptions,
    enterKeyHint?: EnterKeyHintType,
    secureTextEntry?: boolean,
    leftIcon?: ImageSourcePropType
    rightIcon?: ImageSourcePropType,
    verify?: boolean
}

function InputField({
    style = {},
    textInputStyle = {},
    leftIconAspectRatio=1,
    rightIconAspectRatio=1,
    keyboardType = 'default',
    enterKeyHint = 'next',
    secureTextEntry = false,
    leftIcon = null,
    rightIcon = null,
    verify = false,
    ...props }: InputFieldProps) {
    const [text, setText] = useState('');

    return (
        <View style={[style, styles.container, verify && text !== '' ? { borderWidth: 1, borderColor: '#85BF61' } : null]}>
            <Image source={leftIcon} style={[styles.icon, {aspectRatio: leftIconAspectRatio}]} />
            <TextInput
                style={[styles.input, textInputStyle]}
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect={false}
                onChangeText={setText}
                value={text}
                keyboardType={keyboardType}
                enterKeyHint={enterKeyHint}
                secureTextEntry={secureTextEntry}
                {...props}
            />
            {verify && text !== '' ? <Image source={verifiedIcon}
                style={[styles.icon, {aspectRatio: rightIconAspectRatio}, verify && text !== '' ? { tintColor: '#85BF61' } : null]} /> : <></>}
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor: '#EFECE9',
        borderRadius: 50,
        paddingHorizontal: '1.1rem',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        height: undefined,
        width: '6.25%',
        tintColor: '#9A9A9A',
    },
    input: {
        flex: 1,
        marginHorizontal: '4%',
    }
});

export default InputField;
