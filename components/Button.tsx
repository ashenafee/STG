import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

import type { PressableProps } from 'react-native';

interface ButtonProps {
    transparentShadow?: boolean,
    shadow?: boolean,
    center?: string,
    style?: any|any[],
    children: React.ReactNode,
}

const Button = ({ transparentShadow = false, shadow = false, center = '', children, style = { backgroundColor: 'white', buttonColor: 'white' }, ...props }: ButtonProps&PressableProps) => {
    let flatStyle = StyleSheet.flatten(style);

    return (
        <>
            {transparentShadow ? <View style={[styles.shadow, flatStyle, { backgroundColor: flatStyle.backgroundColor }]} /> : <></>}
            <Pressable
                style={[flatStyle, shadow&&!transparentShadow ? styles.shadow : null, { backgroundColor: transparentShadow ? flatStyle.buttonColor : flatStyle.backgroundColor, zIndex: 1000 }]}
                {...props}>
                <View
                    style={[styles.buttonContainer,
                    {
                        alignItems: center.includes('v') ? 'center' : 'stretch',
                        height: center.includes('v') ? '100%': null,
                        justifyContent: center.includes('h') ? 'center' : 'flex-start',
                        width: center.includes('h') ? '100%': null,
                    }]}>
                    {children}
                </View>
            </Pressable>
        </>
    );
}

const styles = EStyleSheet.create({
    shadow: {
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOpacity: 0.1,
        elevation: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default Button;
