import React from 'react';
import { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Screen from '../components/Screen';
import Button from '../components/Button';

import { facilities, filterIcons } from '../facilities';
import type { Database, DonationCentre } from '../facilities'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const getFacilities = (selected: number, facilities: Database[]): DonationCentre[] => {
    const distanceComparator = (a, b) => {
        const [a_val, a_unit] = a.distance.split(' ');
        const [b_val, b_unit] = b.distance.split(' ');

        if (a_unit === b_unit) {
            return Number(a_val) > Number(b_val) ? 1 : -1;
        }

        return a_unit === "km" ? 1 : -1;
    }
    switch (selected) {
        case 0:
            return facilities.map(({ category, locations }) => {
                return locations.filter((location) => location.featured);
            }).flat();
        case 1:
            return facilities
                .map(({ category, locations }) => {
                    return locations;
                })
                .flat()
                .sort(distanceComparator);
        case 2:
            return facilities
                .map(({ category, locations }) => {
                    return locations;
                })
                .flat()
                .sort((a, b) => (a.fullName > b.fullName ? 1 : -1));
        case 3:
            return facilities.find(({ category }) => category === 'food').locations;
        case 4:
            return facilities.find(({ category }) => category === 'clothing').locations;
        case 5:
            return facilities.find(({ category }) => category === 'medicine').locations;
        case 6:
            return facilities.find(({ category }) => category === 'emergency').locations;
        default:
            return [];
    }
}

const FilterButton = ({ selection, index, setSelected, name }) => {
    const selectedFilterStyle = {
        backgroundColor: EStyleSheet.value('$emphTextColor'),
        borderWidth: 0,
    }

    const defaultFilterStyle = {
        backgroundColor: EStyleSheet.value('$pageBackgroundColor'),
        borderWidth: 0.6,
    }

    return (
        <Button
            center='v'
            style={[styles.filterButton, selection === index ? selectedFilterStyle : defaultFilterStyle]}
            onPress={() => setSelected(index)}
        >
            <Image source={filterIcons[name]} style={[styles.filterIcon, { tintColor: selection === index ? 'white' : EStyleSheet.value('$emphTextColor') }]} />
            <Text style={[styles.filterText, { color: selection === index ? 'white' : EStyleSheet.value('$emphTextColor') }]}>{name}</Text>
        </Button>
    );
}

function ListViewScreen({ navigation }) {
    const [selected, setSelected] = useState(0);

    const selectedFilterStyle = {
        backgroundColor: EStyleSheet.value('$emphTextColor'),
        borderWidth: 0,
    }

    const defaultFilterStyle = {
        backgroundColor: EStyleSheet.value('$pageBackgroundColor'),
        borderWidth: 1,
    }

    return (
        <Screen>
            <Text style={styles.title}>Donation Centres</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>there's a place for <Text style={styles.subtitleEmph}>everything </Text></Text>
                <Image source={require('../assets/heart_hands.png')} style={styles.subtitleLove} />
            </View>
            <View style={styles.filterContainer}>
                <View style={styles.filterRow}>
                    <FilterButton
                        selection={selected}
                        index={0}
                        setSelected={setSelected}
                        name="featured"
                    />
                    <FilterButton
                        selection={selected}
                        index={1}
                        setSelected={setSelected}
                        name="distance"
                    />
                    <FilterButton
                        selection={selected}
                        index={2}
                        setSelected={setSelected}
                        name="a to z"
                    />
                    <FilterButton
                        selection={selected}
                        index={3}
                        setSelected={setSelected}
                        name="food"
                    />
                </View>
                <View style={styles.filterRow}>
                    <FilterButton
                        selection={selected}
                        index={4}
                        setSelected={setSelected}
                        name="clothing"
                    />
                    <FilterButton
                        selection={selected}
                        index={5}
                        setSelected={setSelected}
                        name="medicine"
                    />
                    <FilterButton
                        selection={selected}
                        index={6}
                        setSelected={setSelected}
                        name="emergency"
                    />
                </View>
            </View>
            <View style={styles.listContainer}>
                <ScrollView
                    style={styles.scrollViewStyle}
                    contentContainerStyle={styles.scrollViewContent}
                    fadingEdgeLength={300}
                >
                    {
                        getFacilities(selected, facilities).map((location, index) => {
                            return (
                                <Pressable key={index} style={styles.cardContainer} onPress={()=>navigation.navigate("DetailsScreen", {facility: location})}>
                                    <View style={styles.cardLeft}>
                                        <Image source={location.thumbnail} style={styles.cardImage} />
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
                                                        right: `${(1 - location.progress) * 115 - 15}%`,
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
                                        <Text style={styles.progressText}>{location.progress * 100}% of goal completed</Text>
                                    </View>
                                    <View style={styles.cardRight}>
                                        <Text style={styles.cardTitle}>{location.fullName}</Text>
                                        <View style={styles.statusSection}>
                                            <Button center='v' shadow={true} style={styles.openStatus} disabled={true}>
                                                <Text style={styles.openText}>open now</Text>
                                            </Button>
                                            <Text style={styles.closingText}>closes in 3h</Text>
                                        </View>
                                        <Text style={styles.blurb} numberOfLines={4}>
                                            We are on a mission to eliminate food insecurity, and advocate for solutions to end poverty. Together, with your support we can work to feed our communities and end hunger in our city.
                                        </Text>
                                        <View style={styles.distanceSection}>
                                            <Button center='v' disabled={true} style={styles.distanceItem}>
                                                <Image source={require('../assets/distance.png')} style={styles.distanceIcon} />
                                                <Text style={styles.distanceText}>{location.distance}</Text>
                                            </Button>
                                            <Button center='v' disabled={true} style={styles.distanceItem}>
                                                <Image source={require('../assets/walking.png')} style={styles.walkingIcon} />
                                                <Text style={styles.distanceText}>{location.travelTime}</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </Pressable>
                            );
                        })
                    }
                </ScrollView>
            </View>
        </Screen>
    );
}

const styles = EStyleSheet.create({
    title: {
        position: 'absolute',
        top: '6.83%',
        fontSize: '1.125rem',
        fontFamily: "Kumbh Sans-SemiBold",
        letterSpacing: '0.09rem',
        color: '$emphTextColor',
    },
    subtitleContainer: {
        position: 'absolute',
        top: '11.86%',
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
    subtitleLove: {
        height: '1rem',
        width: undefined,
        aspectRatio: 1,
    },
    filterContainer: {
        position: 'absolute',
        top: '18%',
        width: '100%',
        height: '8.62%',
        justifyContent: 'space-between',
    },
    filterRow: {
        height: '43.71%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterButton: {
        borderRadius: 50,
        height: '100%',
        marginHorizontal: '0.75%',
        borderColor: '$gray',
        paddingHorizontal: '0.56rem',
    },
    filterIcon: {
        height: '57.14%',
        width: undefined,
        aspectRatio: 1,
        marginRight: '0.2rem',
    },
    filterText: {
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
    },
    listContainer: {
        position: 'absolute',
        left: 0,
        top: '29.55%',
        width: '100%',
        height: '68.12%', // 100% - 2.33 - top
    },
    scrollViewStyle: {
        marginHorizontal: -30,
        marginBottom: -30,
        marginTop: -30,
    },
    scrollViewContent: {
        alignItems: 'center',
        gap: '0.69rem',
        paddingBottom: 30, // must be negative of scrollViewStyle marginBottom above for bottom shadow to show
        paddingHorizontal: 30, // see ^
        paddingTop: 30,
    },
    cardContainer: {
        width: '83.6%',
        height: undefined,
        aspectRatio: 275 / 118,
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
    cardLeft: {
        width: '39%',
        height: '100%',
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    cardImage: {
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
    cardRight: {
        flex: 1,
    },
    cardTitle: {
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

export default ListViewScreen;
