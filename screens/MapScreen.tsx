import React from 'react';
import { useState } from 'react';
import { View, Pressable, Text, Image, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MapView, { Marker } from 'react-native-maps';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import { facilities, pins, categoryIcons } from '../facilities';
import Screen from '../components/Screen';
import Button from '../components/Button';

const editSelections = (index, selected, setSelected) => {
    let newSelection = selected.slice();
    newSelection[index] = !selected[index];
    setSelected(newSelection);
}

function MapScreen({ navigation }) {
    const [selected, setSelected] = useState(facilities.map(() => false));
    const [showPopup, setShowPopup] = useState(false);
    const [popUpLocation, setPopupLocation] = useState(facilities[0].locations[0]);

    return (
        <Screen>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 43.6532,
                    longitude: -79.3832,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={() => setShowPopup(false)}
            >
                {
                    facilities.map(({ locations }, i) => {
                        return (selected[i] || selected.every((val) => !val) ?
                            locations.map((location, j) => {
                                return (<Marker
                                    key={j}
                                    coordinate={location.coordinates}
                                    image={pins[location.pinType]}
                                    onPress={(e) => { e.stopPropagation(); /* <---- NEEDED FOR iOS */ setShowPopup(true); setPopupLocation(location); }}
                                />);
                            })
                            : []);
                    })
                }
            </MapView>
            <View style={styles.filterContainer}>
                {
                    facilities.map(({category, locations}, index) => {
                        return (
                            <Button
                                key={index}
                                style={[styles.filter, { backgroundColor: selected[index] ? EStyleSheet.value('$emphTextColor') : EStyleSheet.value('$pageBackgroundColor') }]}
                                onPress={() => { editSelections(index, selected, setSelected) }}
                                center='vh'>
                                    <Image source={categoryIcons[category]} style={styles.categoryIcon} tintColor={selected[index] ? 'white' : null}/>
                            </Button>
                        );
                    })
                }
            </View>
            <Pressable onPress={()=>navigation.navigate('ListViewScreen')} style={styles.listButton}>
                <Image source={require('../assets/list_icon.png')} style={styles.listIcon}/>
            </Pressable>
            <View style={[styles.selectedPopupContainer, { display: showPopup ? 'flex' : 'none' }]}>
                <View style={styles.popupLeft}>
                    <Image source={popUpLocation.thumbnail} style={styles.popUpImage} />
                    <MaskedView
                        style={styles.progressBar}
                        androidRenderingMode='software' // required for updating progress bar on android
                        maskElement={
                            <View style={{
                                backgroundColor: 'transparent',
                                width: '100%',
                                height: '100%',
                                borderWidth: 1,
                                borderColor: 'red',
                                borderRadius: 30,
                                overflow: 'hidden',
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    right: `${(1 - popUpLocation.progress) * 115 - 15}%`,
                                    bottom: 0,
                                    width: '200%',
                                    height: 0,
                                    backgroundColor: 'transparent',
                                    borderStyle: "solid",
                                    borderRightWidth: 250,
                                    borderBottomWidth: 100,
                                    borderRightColor: 'transparent',
                                    borderBottomColor: 'red',
                                }} />
                            </View>
                        }
                    >
                        <LinearGradient colors={['#D31823', '#FC813A', '#FFD43D']} start={{ x: 0, y: 0 }} end={{ x: 1.1, y: 0 }} locations={[0, 0.6, 1]} style={{ width: '100%', height: '100%' }} />
                    </MaskedView>
                    <Text style={styles.progressText}>{popUpLocation.progress * 100}% of goal completed</Text>
                </View>
                <View style={styles.popupRight}>
                    <Pressable style={styles.expandContainer} onPress={()=>{console.log('go to details')}}>
                        <Image source={require('../assets/expand.png')} style={styles.expand} />
                    </Pressable>
                    <Text style={styles.popupTitle}>{popUpLocation.fullName}</Text>
                    <View style={styles.statusSection}>
                        <Button center='v' shadow={true} style={styles.openStatus} disabled={true}>
                            <Text style={styles.openText}>open now</Text>
                        </Button>
                        <Text style={styles.closingText}>closes in 3h</Text>
                    </View>
                    <Text style={styles.blurb}>
                        We are on a mission to eliminate food insecurity, and advocate for solutions to end poverty. Together, with your support we can work to feed our communities and end hunger in our city.
                    </Text>
                    <View style={styles.distanceSection}>
                    <Button center='v' disabled={true} style={styles.distanceItem}>
                            <Image source={require('../assets/distance.png')} style={styles.distanceIcon} />
                            <Text style={styles.distanceText}>{popUpLocation.distance}</Text>
                        </Button>
                        <Button center='v' disabled={true} style={styles.distanceItem}>
                            <Image source={require('../assets/walking.png')} style={styles.walkingIcon} />
                            <Text style={styles.distanceText}>{popUpLocation.travelTime}</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Screen>
    );
}

const styles = EStyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    callout: {
        width: '100%',
        backgroundColor: 'red',
    },
    filterContainer: {
        position: 'absolute',
        right: '4.3%',
        top: '4.3%',
    },
    filter: {
        width: '2.9375rem',
        height: '2.9375rem',
        marginVertical: '0.3rem',
        borderRadius: 10,
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 4,
        shadowColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.5)' : '#E0EBF0',
        shadowOpacity: 0.4,
        elevation: 10,
    },
    categoryIcon: {
        width: '63.83%',
        height: '63.83%',
    },
    listButton: {
        position: 'absolute',
        bottom: '1%',
        right: '3.2%',
        height: '7.12%',
        width: undefined,
        aspectRatio: 1,
    },
    listIcon: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    selectedPopupContainer: {
        position: 'absolute',
        width: '95.75%',
        height: '24.42%',
        bottom: '2.125%',
        backgroundColor: '$pageBackgroundColor',
        paddingHorizontal: '3.5%',
        borderRadius: 12,
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOpacity: 1,
        elevation: 6,
        flexDirection: 'row',
        gap: 12,
    },
    popupLeft: {
        width: '39%',
        height: '100%',
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    popUpImage: {
        width: '100%',
        height: '68.41%',
        borderRadius: 10,
        marginTop: '8.1%',
    },
    progressBar: {
        width: '100%',
        height: '5%',
        marginTop: '5.5%',
        marginBottom: '3.5%',
    },
    progressText: {
        fontFamily: 'Ubuntu-LightItalic',
        fontSize: '0.4375rem',
        letterSpacing: '0.035rem',
        color: '$textColor',
        alignSelf: 'flex-end',
        marginRight: '6%',
    },
    popupRight: {
        flex: 1,
    },
    expandContainer: {
        position: 'absolute',
        top: '4.35%',
        right: '-2.5%',
    },
    expand: {
        width: '1.0625rem',
        height: '1.0625rem',
    },
    popupTitle: {
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '0.625rem',
        letterSpacing: '0.05rem',
        color: '$emphTextColor',
        marginTop: '7%',
    },
    statusSection: {
        marginTop: '3.5%',
        width: '100%',
        height: '13.23%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    openStatus: {
        paddingHorizontal: '0.5rem',
        height: '100%',
        backgroundColor: '#FBE6E7',
        borderRadius: 50,
    },
    openText: {
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
        color: '$emphTextColor',
    },
    closingText: {
        color: '#9A9A9A',
        marginLeft: '7.6%',
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem'
    },
    blurb: {
        marginTop: '4.4%',
        width: '90%',
        fontFamily: 'Ubuntu-LightItalic',
        fontSize: '0.4375rem',
        color: '$textColor',
        letterSpacing: '0.035rem',
        lineHeight: '0.625rem',
    },
    distanceSection: {
        alignSelf: 'flex-end',
        marginBottom: '6.6%',
        width: '100%',
        height: '8.8%',
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'flex-end',
    },
    distanceItem: {
        height: '100%',
    },
    walkingIcon: {
        height: '100%',
        width: undefined,
        aspectRatio: 1,
    },
    distanceIcon: {
        height: '70%',
        width: undefined,
        aspectRatio: 1,
        marginTop: '-8%',
        marginRight: '4%',
        transform:[
            { rotateZ: '30deg'}
        ]
    },
    distanceText: {
        color: '$gray',
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
    }
});

export default MapScreen;
