import React from 'react';
import { useContext, useState } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

import Screen from '../components/Screen';
import Button from '../components/Button';

import { LoginContext } from '../contexts/AppContext';

import type { StyleProp, ViewStyle } from 'react-native';

const Category = ({ selectedCounter, setSelectedCounter, text }) => {
    const [selected, setSelected] = useState(false);

    const unselectedStyle:StyleProp<ViewStyle> = {
        backgroundColor: EStyleSheet.value('$pageBackgroundColor'),
        borderColor: '#CECECE'
    };

    const selectedStyle:StyleProp<ViewStyle> = {
        borderColor: '#B3CFDE',
        backgroundColor: '#EAEFF1'
    };

    const pressFunction = () => {
        if (selected) {
            setSelectedCounter(selectedCounter - 1);
            setSelected(false);
        } else {
            if (selectedCounter < 3) {
                setSelectedCounter(selectedCounter + 1);
                setSelected(true);
            }
        }
    }

    return (
        <Button center='v' style={[styles.categoryButton, selected ? selectedStyle : unselectedStyle]} onPress={pressFunction}>
            <Text style={styles.categoryText}>{text}</Text>
        </Button>
    );
}

function OptionsScreen() {
    const loginHandler = useContext(LoginContext);
    const [selectedCounter, setSelectedCounter] = useState(0);

    return (
        <Screen style={styles.screen}>
            <Image source={require('../assets/options_girl.png')} style={styles.girl} />
            <Image source={require('../assets/options_girl_background.png')} style={styles.girlBackground} />
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Let's select your interests.</Text>
                <Text style={styles.subtitle}>choose up to 3 donation categories</Text>
                <View style={styles.categoryRow}>
                    <Category 
                    text="🥫 non-perishable food items" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🍽️ dishware" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
                <View style={styles.categoryRow}>
                    <Category 
                    text="🧣 outerwear" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🥘 perishable food items" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
                <View style={styles.categoryRow}>
                    <Category 
                    text="💸 money" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🛏️ blankets" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🧼 toiletries" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
                <View style={styles.categoryRow}>
                    <Category 
                    text="📓 school supplies" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="👕 clothes" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🪁 toys" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
                <View style={styles.categoryRow}>
                    <Category 
                    text="🧸 stuffed animals" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🌷 feminine products" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
                <View style={styles.categoryRow}>
                    <Category 
                    text="📖 books" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🩸 emergency" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="⚕️ medicine" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
                <View style={styles.categoryRow}>
                    <Category 
                    text="👚 laundry supplies" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                    <Category 
                    text="🏡 household items" 
                    selectedCounter={selectedCounter}
                    setSelectedCounter={setSelectedCounter}
                    />
                </View>
            </View>
            <Pressable style={styles.continueButton} onPress={()=>loginHandler(true)}>
                <Text style={styles.continueText}>i'm done!</Text>
                <Image source={require('../assets/continue.png')} style={styles.continueImage} />
            </Pressable>
        </Screen>
    );
}

const styles = EStyleSheet.create({
    screen: {
        backgroundColor: '#E0EBF0'
    },
    girl: {
        position: 'absolute',
        left: '28%',
        top: '16%',
        height: '27.3%',
        width: undefined,
        aspectRatio: 1024 / 1254,
    },
    girlBackground: {
        position: 'absolute',
        left: '15%',
        top: '8%',
        height: '36%',
        width: undefined,
        aspectRatio: 674 / 641,
        zIndex: -500,
    },
    bodyContainer: {
        marginTop: '72.66%',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '$pageBackgroundColor',
        paddingHorizontal: '8.47%',
    },
    title: {
        marginTop: '12.36%',
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '1.125rem',
        letterSpacing: '0.09rem',
        color: '$emphTextColor',
    },
    subtitle: {
        fontFamily: 'Kumbh Sans-Light',
        fontSize: '0.75rem',
        letterSpacing: '0.06rem',
        color: '$textColor',
        marginTop: '2%',
        marginBottom: '3%',
    },
    categoryRow: {
        width: '100%',
        height: '7.1%',
        marginVertical: '1.2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.3rem',
    },
    categoryButton: {
        borderWidth: 0.6,
        borderRadius: 50,
        paddingHorizontal: '0.85rem',
        height: '100%',
    },
    categoryText: {
        fontFamily: 'Ubuntu-Light',
        fontSize: '0.625rem',
        color: '$textColor',
        letterSpacing: '0.05rem',
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
});

export default OptionsScreen;
