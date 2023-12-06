import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Screen from '../components/Screen';
import { filterIcons, type DonationCentre } from '../facilities';
import Button from '../components/Button';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import type { ViewProps, StyleProp } from 'react-native';

const ProgressBar = ({ style, progress }) => {
    return (
        <MaskedView
            style={style}
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
                        right: `${(1 - progress) * 115 - 15}%`,
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
    );
}

const Section = ({ icon, children }) => {
    return (
        <View style={styles.sectionContainer}>
            <Image source={icon} style={styles.sectionIcon} />
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );
}

const Bullet = ({ bullet, children, style = {} }: { bullet: any, children: React.ReactNode, style?: StyleProp<ViewProps> }) => {
    return (
        <View style={[styles.row, style]}>
            <View style={styles.bullet}>
                {bullet}
            </View>
            <View style={styles.bulletText}>
                {children}
            </View>
        </View>
    );
}

function DetailsScreen({ route }) {
    const facility: DonationCentre = route.params.facility;
    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ]
    const checkmark_bullet = <Image source={require('../assets/checkmark_bullet.png')} style={styles.checkmarkBullet} />;
    const bullet = <View style={styles.bulletPoint} />

    return (
        <Screen style={styles.screen}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.overviewSection}>
                    {
                        facility.featured ?
                            <Image source={require('../assets/featured_star.png')} style={styles.featuredStar} />
                            : <></>
                    }
                    <Text style={styles.title}>{facility.fullName}</Text>
                    <View style={styles.summaryContainer}>
                        <Button center='v' style={styles.summaryItem}>
                            <Image source={filterIcons[facility.pinType]} style={styles.summaryIcon} />
                            <Text style={styles.summaryText}>{facility.type}</Text>
                        </Button>
                        <Button center='v' style={styles.summaryItem}>
                            <Image source={require('../assets/distance.png')} style={styles.distanceIcon} />
                            <Text style={styles.summaryText}>{facility.distance}</Text>
                        </Button>
                        <Button center='v' style={styles.summaryItem}>
                            <Image source={require('../assets/walking.png')} style={styles.summaryIcon} />
                            <Text style={styles.summaryText}>{facility.travelTime}</Text>
                        </Button>
                        <Button center='v' style={styles.summaryItem}>
                            <Image source={require('../assets/accessibility.png')} style={styles.summaryIcon} />
                            <Text style={styles.summaryText}>accessible</Text>
                        </Button>
                    </View>
                    <View style={styles.linksContainer}>
                        <Button center='v' style={[styles.linkItem, { backgroundColor: EStyleSheet.value('$emphTextColor'), borderWidth: 0 }]}>
                            <Image source={require('../assets/map_icon.png')} style={styles.linkIcon} />
                            <Text style={[styles.linkText, { color: 'white' }]}>open in maps</Text>
                        </Button>
                        <Button center='v' style={styles.linkItem}>
                            <Image source={require('../assets/globe_icon.png')} style={styles.linkIcon} />
                            <Text style={styles.linkText}>website</Text>
                        </Button>
                        <Button center='v' style={styles.linkItem}>
                            <Image source={require('../assets/phone_icon.png')} style={styles.linkIcon} />
                            <Text style={styles.linkText}>call</Text>
                        </Button>
                    </View>
                    <View style={styles.pictureContainer}>
                        <Image source={facility.thumbnail} style={styles.imageLarge} />
                        <View style={styles.pictureRightContainer}>
                            <Image source={facility.thumbnail} style={styles.imageSmall} />
                            <Image source={facility.thumbnail} style={styles.imageSmall} />
                        </View>
                    </View>
                    <Text style={styles.blurb}>
                        We are on a mission to eliminate food insecurity, and advocate for solutions to end poverty. Together, with your support we can work to feed our communities and end hunger in our city.
                    </Text>
                    <ProgressBar style={styles.progressBar} progress={facility.progress} />
                    <Text style={styles.progressText}>{facility.progress * 100}% of goal completed</Text>
                </View>
                <Section icon={require('../assets/place_icon.png')}>
                    <Text style={styles.sectionText}>{facility.address}</Text>
                </Section>
                <Section icon={require('../assets/time_icon.png')}>
                    <View style={styles.timesWrapper}>
                        <View style={styles.statusSection}>
                            <Button center='vh' style={styles.openStatus} disabled={true}>
                                <Text style={styles.openText}>open now</Text>
                            </Button>
                            <View style={styles.closeDot} />
                            <Text style={styles.closingText}>closes in 3h</Text>
                        </View>
                        <View style={styles.timesContainer}>
                            {
                                facility.openTimes.map((time, index) => {
                                    return (
                                        <View key={index} style={styles.timeEntry}>
                                            <Text style={[styles.dayText, { color: index === 3 ? EStyleSheet.value('$emphTextColor') : EStyleSheet.value('$gray') }]}>{days[index]}:</Text>
                                            <Text style={[styles.timeText, { color: index === 3 ? EStyleSheet.value('$emphTextColor') : EStyleSheet.value('$gray') }]}>{time}</Text>
                                        </View>
                                    );
                                })
                            }
                        </View>
                        <Image source={require('../assets/detail_time_leaves.png')} style={styles.timeLeaves} />
                    </View>
                </Section>
                <Section icon={require('../assets/globe_icon.png')}>
                    <Text style={styles.sectionText}>{facility.website}</Text>
                </Section>
                <Section icon={require('../assets/phone_icon.png')}>
                    <Text style={styles.sectionText}>{facility.phoneNumber}</Text>
                </Section>
                <View style={styles.finePrintContainer}>
                    <Text style={styles.finePrintHeader}>This location accepts{'\u2026'}</Text>
                    <Bullet bullet={checkmark_bullet} style={styles.acceptsRow}>
                        <Text style={styles.acceptsText}>food</Text>
                    </Bullet>
                    <Bullet bullet={checkmark_bullet} style={styles.acceptsRow}>
                        <Text style={styles.acceptsText}>monetary donations</Text>
                    </Bullet>
                    <Text style={styles.taxText}>Every gift you make over $10 will receive a tax receipt from Daily Bread Food Bank.</Text>
                    <Text style={styles.finePrintHeader}>Most needed items include{'\u2026'}</Text>
                    <Bullet bullet={bullet}>
                        <Text style={styles.neededText}>Canned fish {'('}tuna, salmon, sardines{')'}</Text>
                    </Bullet>
                    <Bullet bullet={bullet}>
                        <Text style={styles.neededText}>Canned fruit</Text>
                    </Bullet>
                    <Bullet bullet={bullet}>
                        <Text style={styles.neededText}>Canned vegetables</Text>
                    </Bullet>
                    <Bullet bullet={bullet}>
                        <Text style={styles.neededText}>Oatmeal</Text>
                    </Bullet>
                    <Bullet bullet={bullet}>
                        <Text style={styles.neededText}>Canned tomatoes {'('}whole, diced, crushed{')'}</Text>
                    </Bullet>
                    <Bullet bullet={bullet}>
                        <Text style={styles.neededText}>Nut butters {'('}peanut, almond{')'}</Text>
                    </Bullet>
                </View>
            </ScrollView>
            <View style={styles.bottomShadow} />
        </Screen>
    );
}

const styles = EStyleSheet.create({
    scrollView: {
        width: '100%',
        height: '100%',
        marginTop: '17%',
    },
    overviewSection: {
        width: '100%',
        height: undefined,
        aspectRatio: 329 / 351,
        paddingHorizontal: '7.6%',
        backgroundColor: '$pageBackgroundColor',
        shadowOffset: { width: 1, height: 4 },
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 1,
        elevation: 3,
        zIndex: -1000,
        marginTop: '-8%',
    },
    featuredStar: {
        width: '1.3rem',
        height: undefined,
        aspectRatio: 1,
        position: 'absolute',
        top: '8%',
        right: '7.5%',
    },
    title: {
        marginTop: '11.87%',
        fontFamily: 'Kumbh Sans-Medium',
        color: '$textColor',
        letterSpacing: '0.06rem',
        fontSize: '0.75rem',
    },
    summaryContainer: {
        width: '100%',
        height: '3.7%',
        marginTop: '3%',
        flexDirection: 'row',
        gap: '0.5rem',
    },
    summaryItem: {
        backgroundColor: '$pageBackgroundColor',
    },
    summaryIcon: {
        height: '100%',
        width: undefined,
        aspectRatio: 1,
        marginRight: '4%',
    },
    summaryText: {
        color: '$gray',
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
    },
    distanceIcon: {
        height: '70%',
        width: undefined,
        aspectRatio: 1,
        marginTop: '-8%',
        marginRight: '4%',
        transform: [
            { rotateZ: '30deg' }
        ]
    },
    linksContainer: {
        flexDirection: 'row',
        gap: '0.5rem',
        width: '100%',
        height: '6%',
        marginTop: '3.5%',
    },
    linkItem: {
        backgroundColor: '$pageBackgroundColor',
        borderRadius: 50,
        borderColor: '$gray',
        borderWidth: 0.6,
    },
    linkIcon: {
        height: '57.14%',
        width: undefined,
        aspectRatio: 1,
        marginRight: '3%',
        marginHorizontal: '0.56rem',
    },
    linkText: {
        color: '$emphTextColor',
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
    },
    pictureContainer: {
        marginTop: '6%',
        height: '40.46%',
        width: '100%',
        flexDirection: 'row',
        gap: '0.1rem',
    },
    imageLarge: {
        flex: 11.6875,
        height: '100%',
        borderRadius: 10,
    },
    pictureRightContainer: {
        flex: 5.5625,
        height: '100%',
        gap: '0.1rem',
    },
    imageSmall: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
    },
    blurb: {
        marginTop: '3.6%',
        width: '96.75%',
        color: '$textColor',
        fontFamily: 'Ubuntu-LightItalic',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        lineHeight: '0.75rem',
    },
    progressBar: {
        width: '44%',
        height: '1.5%',
        alignSelf: 'flex-end',
        marginTop: 'auto',
    },
    progressText: {
        color: '$textColor',
        fontSize: '0.4375rem',
        fontFamily: 'Ubuntu-RegularItalic',
        letterSpacing: '0.035rem',
        alignSelf: 'flex-end',
        marginBottom: '6%',
        marginTop: '2%',
    },
    sectionContainer: {
        width: '100%',
        paddingVertical: '3.36%',
        paddingHorizontal: '6%',
        borderBottomWidth: 1,
        borderColor: '#DBDBDB',
        flexDirection: 'row',
        gap: '0.75rem',
    },
    sectionIcon: {
        width: '1rem',
        height: '1rem',
    },
    sectionContent: {
        flex: 1,
        justifyContent: 'center',
    },
    sectionText: {
        fontFamily: 'Kumbh Sans-Regular',
        fontSize: '0.5625rem',
        color: '$textColor',
        letterSpacing: '0.045rem',
    },
    statusSection: {
        width: '100%',
        height: '1.125rem',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.6rem'
    },
    openStatus: {
        width: '3.6875rem',
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
    closeDot: {
        backgroundColor: '$gray',
        borderRadius: 1000,
        width: '0.2rem',
        height: '0.2rem',
    },
    closingText: {
        color: '$textColor',
        fontFamily: 'Kumbh Sans-Regular',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem'
    },
    timesWrapper: {
        flex: 1,
    },
    timesContainer: {
        marginTop: '3.5%',
    },
    timeEntry: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: '0.05rem',
    },
    dayText: {
        flex: 25,
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        lineHeight: '0.75rem',
    },
    timeText: {
        flex: 75,
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        lineHeight: '0.75rem',
    },
    timeLeaves: {
        position: 'absolute',
        bottom: '-10%',
        right: '-3%',
        height: '45.73%',
        width: undefined,
        aspectRatio: 175 / 182,
    },
    bottomShadow: {
        position: 'absolute',
        backgroundColor: 'black',
        top: '100%',
        width: '100%',
        left: 0,
        height: 50,
        shadowOffset: { width: 1, height: -4 },
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0)',
        shadowOpacity: 1,
        elevation: 25,
    },
    row: {
        marginLeft: '5%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
    },
    bullet: {
        marginRight: '0.5rem',
    },
    bulletText: {
        flex: 1
    },
    checkmarkBullet: {
        height: '0.75rem',
        width: '0.75rem',
    },
    bulletPoint: {
        backgroundColor: '$textColor',
        width: '0.15rem',
        height: '0.15rem',
        marginTop: '0.258rem',
        borderRadius: 100,
    },
    finePrintContainer: {
        width: '100%',
        paddingVertical: '3.36%',
        paddingHorizontal: '6%',
        marginBottom: '0.6rem'
    },
    finePrintHeader: {
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.625rem',
        letterSpacing: '0.05rem',
        color: '$textColor',
        marginBottom: '1%',
    },
    acceptsText: {
        fontFamily: 'Kumbh Sans-Regular',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        color: '$textColor',
    },
    acceptsRow: {
        marginVertical: '0.2rem',
    },
    taxText: {
        fontFamily: 'Ubuntu-LightItalic',
        color: '$emphTextColor',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        lineHeight: '0.75rem',
        marginTop: '0.05rem',
        marginLeft: '11%',
        marginBottom: '3.5%',
    },
    neededText: {
        fontFamily: 'Ubuntu-Light',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        color: '$textColor',
        lineHeight: '0.75rem'
    }
});

export default DetailsScreen;