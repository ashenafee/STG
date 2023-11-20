import React from 'react';
import { View, Image, Text, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'
import EStyleSheet from 'react-native-extended-stylesheet';

function WelcomeScreen({ navigation }) {
    const backgroundCircle = require('../assets/background_blob.png');

    return (
        <View style={styles.container}>
            <Image source={backgroundCircle} style={styles.ellipse1} blurRadius={70}></Image>
            <Image source={backgroundCircle} style={styles.ellipse2} blurRadius={70}></Image>
            <Image source={backgroundCircle} style={styles.ellipse3} blurRadius={70}></Image>
            <Image source={backgroundCircle} style={styles.ellipse4} blurRadius={70}></Image>
            <Image source={backgroundCircle} style={styles.ellipse5} blurRadius={70}></Image>
            <Image source={backgroundCircle} style={styles.ellipse6} blurRadius={70}></Image>
            <MaskedView style={styles.titleContainer}
                maskElement={
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles.titleText}>see the good <Text style={{ color: 'transparent' }}>🌱</Text></Text>
                    </View>
                }
            >
                <LinearGradient colors={['#FF000F', '#A40811']} start={{ x: 0, y: -0.3 }} end={{ x: 0, y: 2 }} locations={[0, 0.7]}>
                    <Text style={[styles.titleText, { opacity: 0 }]}>see the good <Text style={{ color: 'transparent' }}>🌱</Text></Text>
                </LinearGradient>
            </MaskedView>
            <Image source={require('../assets/seedling.png')} style={styles.seedling} />
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
            <Pressable style={styles.demoContainer}>
                <View style={styles.demoTextContainer}>
                    <Text style={styles.demoText}>see a demo</Text>
                        <Image source={require('../assets/arrow.png')} style={styles.arrow} />
                </View>
            </Pressable>
            <Image source={require('../assets/title_image.png')} style={styles.titleImage} />
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleContainer: {
        top: '18.27%',
    },
    titleText: {
        fontSize: '2rem',
        fontFamily: "Kumbh Sans-Bold",
        letterSpacing: '0.16rem',
        color: '#FF000F',
    },
    seedling: {
        position: 'absolute',
        top: '18.27%',
        height: '2rem',
        width: undefined,
        aspectRatio: 1,
        left: '77%',
    },
    textContainer: {
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
        flex: 1,
    },
    logInContainer: {
        position: 'absolute',
        top: '31.58%',
        borderWidth: 1,
        borderColor: '#C2141E',
        borderRadius: 6,
        width: '9.8125rem',
        height: '2.1875rem',
    },
    logInText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.75rem',
        color: '#C2141E',
        letterSpacing: '0.125rem',
    },
    signUpPosition: {
        position: 'absolute',
        top: '38.6%',
        backgroundColor: 'black',
        borderRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 20,
    },
    signUpContainer: {
        borderRadius: 6,
        width: '9.8125rem',
        height: '2.1875rem',
    },
    signUpText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'transparent',
        letterSpacing: '0.125rem',
    },
    demoContainer: {
        position: 'absolute',
        top: '52.05%',
        width: '8.375rem',
        height: '2.25rem',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: '1.875rem',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOpacity: 0.06,
        elevation: 3,
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
    ellipse1: {
        position: 'absolute',
        width: 120 * 5,
        height: 120 * 5,
        right: '5%',
        marginRight: -120 * 2,
        bottom: '22.8%',
        marginBottom: -120 * 2,
        zIndex: -1000,
        tintColor: '#FFEEB4',
    },
    ellipse2: {
        position: 'absolute',
        width: 150 * 5,
        height: 150 * 5,
        left: '65.95%',
        marginLeft: -150 * 2,
        top: '16.51%',
        marginTop: -150 * 2,
        zIndex: -1000,
        tintColor: '#F4D978',
    },
    ellipse3: {
        position: 'absolute',
        width: 80 * 5,
        height: 80 * 5,
        left: '55.93%',
        marginLeft: -80 * 2,
        bottom: '90.78%',
        marginBottom: -80 * 2,
        zIndex: -1000,
        tintColor: '#96C68E',
    },
    ellipse4: {
        position: 'absolute',
        width: 150 * 5,
        height: 150 * 5,
        left: '17.95%',
        marginLeft: -150 * 2,
        bottom: '5.7%',
        marginBottom: -150 * 2,
        zIndex: -1000,
        tintColor: '#CC3636',
    },
    ellipse5: {
        position: 'absolute',
        width: 150 * 5,
        height: 150 * 5,
        right: '60.64%',
        marginRight: -150 * 2,
        bottom: '83.9%',
        marginBottom: -150 * 2,
        zIndex: -1000,
        tintColor: '#A0DDFF',
    },
    ellipse6: {
        position: 'absolute',
        width: 100 * 5,
        height: 100 * 5,
        right: '1.22%',
        marginRight: -100 * 2,
        bottom: '0.58%',
        marginBottom: -100 * 2,
        zIndex: -1000,
        tintColor: '#96C68E',
    },
    titleImage: {
        position: 'absolute',
        bottom: 0,
        height: '47.51%',
        width: undefined, // necessary for aspectRatio
        aspectRatio: 1,
        backgroundColor: 'transparent',
    },
});

export default WelcomeScreen;
