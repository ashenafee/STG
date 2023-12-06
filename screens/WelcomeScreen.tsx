import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'
import EStyleSheet from 'react-native-extended-stylesheet';

import Screen from '../components/Screen';

function WelcomeScreen({ navigation }) {
    return (
        <Screen>
            <View style={styles.titleContainer}>
                <MaskedView
                    maskElement={
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.titleText}>see the good </Text>
                        </View>
                    }
                >
                    <LinearGradient colors={['#FF000F', '#A40811']} start={{ x: 0, y: -0.3 }} end={{ x: 0, y: 2 }} locations={[0, 0.7]}>
                        <Text style={[styles.titleText, { opacity: 0 }]}>see the good </Text>
                    </LinearGradient>
                </MaskedView>
                <Image source={require('../assets/gift.png')} style={styles.gift} />
            </View>
            <View style={styles.loginShadow} />
            <Pressable style={styles.logInContainer} onPress={() => navigation.navigate('LoginScreen')}>
                <View style={styles.textContainer}>
                    <Text style={styles.logInText}>LOG IN</Text>
                </View>
            </Pressable>
            <Pressable style={styles.signUpPosition} onPress={() => navigation.navigate('SignUpScreen')}>
                <LinearGradient style={styles.signUpContainer} colors={['#D81C27', '#CE131E']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} locations={[0, 0.8]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.signUpText}>SIGN UP</Text>
                    </View>
                </LinearGradient>
            </Pressable>
            <View style={styles.demoShadowContainer} />
            <Pressable style={styles.demoContainer} onPress={() => navigation.navigate('DemoScreen', { signedin: false })}>
                <View style={styles.demoTextContainer}>
                    <Text style={styles.demoText}>see a demo</Text>
                    <Image source={require('../assets/arrow.png')} style={styles.arrow} />
                </View>
            </Pressable>
            <View style={styles.bottomEllipse} />
            <Image source={require('../assets/leaves/54.png')} style={styles.leaf60} />
            <Image source={require('../assets/leaves/54.png')} style={styles.leaf54} />
            <Image source={require('../assets/leaves/56.png')} style={styles.leaf56} />
            <Image source={require('../assets/leaves/59.png')} style={styles.leaf59} />
            <Image source={require('../assets/leaves/59.png')} style={styles.leaf58} />
            <Image source={require('../assets/leaves/61.png')} style={styles.leaf61} />
            <Image source={require('../assets/leaves/61.png')} style={styles.leaf55} />
            <Image source={require('../assets/leaves/53.png')} style={styles.leaf53} />
            <Image source={require('../assets/leaves/57.png')} style={styles.leaf57} />
            <Image source={require('../assets/title_image.png')} style={styles.titleImage} />
        </Screen>
    );
}

const styles = EStyleSheet.create({
    titleContainer: {
        position: 'absolute',
        top: '17.67%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: '2rem',
        fontFamily: "Kumbh Sans-Bold",
        letterSpacing: '0.16rem',
        color: '#FF000F',
    },
    gift: {
        height: '2rem',
        width: undefined,
        aspectRatio: 1,
    },
    textContainer: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        flex: 1,
    },
    loginShadow: {
        position: 'absolute',
        top: '29.8%',
        borderWidth: 1,
        borderColor: '$pageBackgroundColor',
        borderRadius: 6,
        width: '8.6875rem',
        height: '2.1875rem',
        backgroundColor: '$pageBackgroundColor',
        shadowOffset: { width: 1, height: 4 },
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    logInContainer: {
        position: 'absolute',
        top: '29.8%',
        borderWidth: 1,
        borderColor: '$emphTextColor',
        borderRadius: 6,
        width: '8.6875rem',
        height: '2.1875rem',
    },
    logInText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.75rem',
        color: '$emphTextColor',
        letterSpacing: '0.125rem',
    },
    signUpPosition: {
        position: 'absolute',
        top: '37.38%',
        backgroundColor: 'black',
        borderRadius: 6,
        shadowOffset: { width: 1, height: 4 },
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 20,
    },
    signUpContainer: {
        borderRadius: 6,
        width: '8.6875rem',
        height: '2.1875rem',
    },
    signUpText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'transparent',
        letterSpacing: '0.125rem',
    },
    demoShadowContainer: {
        position: 'absolute',
        top: '48.73%',
        width: '8.375rem',
        height: '2.25rem',
        backgroundColor: '#FCFAF8',
        borderRadius: '1.875rem',
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 4,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.06,
        elevation: 3,
        zIndex: -1000
    },
    demoContainer: {
        position: 'absolute',
        top: '48.73%',
        width: '8.375rem',
        height: '2.25rem',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '1.875rem',
        zIndex: 1000,
    },
    demoTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    demoText: {
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '0.75rem',
        color: '#D31823',
        backgroundColor: 'transparent',
        letterSpacing: '0.06rem',
    },
    arrow: {
        width: '1rem',
        height: '0.5rem',
        marginLeft: '0.4rem',
        marginTop: '0.3rem',
    },
    bottomEllipse: {
        position: 'absolute',
        top: '61.5%',
        width: '47.1875rem',
        height: '47.1875rem',
        backgroundColor: '#E0EBF0',
        borderRadius: '47.1875rem',
        zIndex: -1000
    },
    titleImage: {
        position: 'absolute',
        bottom: 0,
        paddingRight: '5%',
        height: '47.31%',
        width: '100%',
        left: '-3%',
        resizeMode: 'contain',
        backgroundColor: 'transparent',
    },
    leaf60: {
        position: 'absolute',
        width: '1.79225rem',
        height: undefined,
        aspectRatio: 194 / 342,
        right: '17.5%',
        bottom: '29.22%',
        transform: [
            { rotateZ: '20deg' }
        ]
    },
    leaf54: {
        position: 'absolute',
        width: '2.15075rem',
        height: undefined,
        aspectRatio: 194 / 342,
        right: '4%',
        bottom: '3%',
        transform: [
            { scaleX: -1 },
            { rotateZ: '-60deg' }
        ]
    },
    leaf56: {
        position: 'absolute',
        width: '2.27275rem',
        height: undefined,
        aspectRatio: 200 / 300,
        right: '2%',
        bottom: '19.58%',
        transform: [
            { rotateZ: '-55deg' }
        ],
    },
    leaf59: {
        position: 'absolute',
        width: '2.47313rem',
        height: undefined,
        aspectRatio: 276 / 279,
        right: '25%',
        bottom: '41%',
        transform: [
            { rotateZ: '100deg' }
        ],
    },
    leaf58: {
        position: 'absolute',
        width: '3.09138rem',
        height: undefined,
        aspectRatio: 276 / 279,
        left: '-2.4%',
        bottom: '8.5%',
        transform: [
            { scaleX: -1 }
        ],
    },
    leaf61: {
        position: 'absolute',
        width: '2.19569rem',
        height: undefined,
        aspectRatio: 215 / 306,
        left: '26.16%',
        bottom: '43.53%',
        transform: [
            { scaleX: -1 }
        ],
    },
    leaf55: {
        position: 'absolute',
        width: '2.19569rem',
        height: undefined,
        aspectRatio: 215 / 306,
        left: '4.74%',
        bottom: '-4.11%',
        transform: [
            { rotateZ: '180deg' }
        ],
    },
    leaf53: {
        position: 'absolute',
        width: '2.65625rem',
        height: undefined,
        aspectRatio: 213 / 225,
        left: '10%',
        bottom: '33%',
        transform: [
            { rotateZ: '10deg' }
        ],
    },
    leaf57: {
        position: 'absolute',
        width: '2.09969rem',
        height: undefined,
        aspectRatio: 257 / 306,
        right: '17%',
        bottom: '13.4%',
        transform: [
            { scaleX: -1 },
            { rotateZ: '180deg' }
        ],
    }
});

export default WelcomeScreen;
