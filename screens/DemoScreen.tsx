import React, { useContext } from 'react';
import { View, Image, Text, Pressable, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Screen from '../components/Screen';
import { LoginContext } from '../contexts/AppContext';
import Button from '../components/Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DemoScreen({ navigation, route }) {
    const loginHandler = useContext(LoginContext);

    const continueFunction = route.params.signedin ?
        () => loginHandler(true) :
        () => navigation.navigate("WelcomeScreen");

    return (
        <Screen>
            <View style={styles.headingContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.headText}>Hey there<Text style={styles.exclaim}>! </Text></Text>
                    <Image source={require('../assets/seedling.png')} style={styles.seedling} />
                </View>
                <Text style={styles.text}>
                    have something to donate?
                </Text>
            </View>
            <Image source={require('../assets/homescreen.png')} style={styles.homescreen} />

            <View style={[styles.step, styles.one]}>
                <Image source={require('../assets/demo1.png')} style={styles.numberOne} />
                <Text style={styles.descriptionText}>tap the camera{"\n"}or photo upload{"\n"}button</Text>
            </View>

            <Button transparentShadow={true} style={[styles.transparentButton, styles.gallery]} center='vh'>
                <Image source={require('../assets/gallery_icon.png')} style={styles.galleryIcon} />
            </Button>
            <Button transparentShadow={true} style={[styles.transparentButton, styles.camera]} center='vh'>
                <Image source={require('../assets/camera_icon.png')} style={styles.cameraIcon} />
            </Button>
            <View style={[styles.step, styles.two]}>
                <Image source={require('../assets/demo2.png')} style={styles.numberTwo} />
                <Text style={styles.descriptionText}>snap a photo of your item <Text style={styles.cameraEmoji}>📸</Text></Text>
            </View>

            <View style={[styles.step, styles.three]}>
                <Image source={require('../assets/demo3.png')} style={styles.numberThree} />
                <Text style={styles.descriptionText}>we'll find donation centres{"\n"}that will accept your item!</Text>
            </View>

            <Image source={require('../assets/demo_girl.png')} style={styles.demoGirl} />
            <Pressable onPress={continueFunction} style={styles.continueButton}>
                <Text style={styles.continueText}>continue</Text>
                <Image source={require('../assets/continue.png')} style={styles.continueImage} />
            </Pressable>
        </Screen>
    );
}

const styles = EStyleSheet.create({
    headingContainer: {
        marginTop: '15.8%',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        width: '100%',
    },
    innerContainer: {
        flexDirection: 'row', // Aligns children inline
        alignItems: 'center', // Optional: Centers children vertically
    },
    headText: {
        color: '$emphTextColor',
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '1.125rem',
        letterSpacing: '0.09rem',
    },
    seedling: {
        height: '1.3rem',
        width: undefined,
        aspectRatio: 1,
    },
    exclaim: {
        fontFamily: 'Kumbh Sans-Bold'
    },
    text: {
        marginTop: '3%',
        fontFamily: 'Kumbh Sans-Light',
        fontSize: '0.75rem',
        letterSpacing: '0.06rem',
        color: '$textColor',
    },
    homescreen: {
        position: 'absolute',
        height: '23.51%',
        width: undefined,
        aspectRatio: 181 / 299,
        left: '28.3%',
        top: '21.4%',
    },
    descriptionText: {
        marginLeft: '0.6rem',
        marginTop: '0.8rem',
        color: '$textColor',
        fontFamily: 'Ubuntu-LightItalic',
        fontSize: '0.625rem',
        letterSpacing: '0.05rem',
        lineHeight: '0.9375rem',
    },
    cameraEmoji: {
        fontFamily: 'Ubuntu-Light'
    },
    step: {
        position: 'absolute',
        flexDirection: 'row', // Aligns children inline
    },
    one: {
        top: '23.2%',
        left: '56.8%',
    },
    numberOne: {
        height: '1.6rem',
        width: undefined,
        aspectRatio: 21 / 52,
        resizeMode: 'contain',
    },
    two: {
        top: '46.6%',
        left: '32.83%'
    },
    numberTwo: {
        height: '1.6rem',
        width: undefined,
        aspectRatio: 48 / 78,
        resizeMode: 'contain',
    },
    three: {
        top: '54.56%',
        left: '45%',
    },
    numberThree: {
        height: '1.6rem',
        width: undefined,
        aspectRatio: 48 / 79,
        resizeMode: 'contain',
    },
    transparentButton: {
        position: 'absolute',
        top: '34.06%',
        height: '6%',
        width: undefined,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: '$pageBackgroundColor',
        buttonColor: 'transparent',
    },
    camera: {
        right: '14%'
    },
    gallery: {
        right: '27%',
    },
    galleryIcon: {
        height: '60%',
        width: undefined,
        aspectRatio: 1,
    },
    cameraIcon: {
        height: '65%',
        width: undefined,
        aspectRatio: 1,
    },
    continueButton: {
        position: 'absolute',
        bottom: '3%',
        right: '7.5%',
        flexDirection: 'row', // Aligns children inline
        alignItems: 'center', // Optional: Centers children vertically
    },
    continueText: {
        color: '$emphTextColor',
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '0.75rem',
        letterSpacing: '0.06rem'
    },
    continueImage: {
        height: '1rem',
        width: undefined,
        aspectRatio: 1,
        marginTop: '0.1rem'
    },
    demoGirl: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: undefined,
        aspectRatio: 658 / 1268,
        zIndex: -1000,
    },
});

export default DemoScreen;
