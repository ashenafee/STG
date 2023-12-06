import React, { useRef } from 'react';
import { useState } from 'react';
import { Text, View, Image, Pressable, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import Screen from '../components/Screen';
import { type DonationCentre, facilities } from '../facilities'

import type { DimensionValue, ImageSourcePropType } from 'react-native';

const arrow = require('../assets/donation_card_arrow.png');

interface DonationCardProps {
  name: string,
  progress: number,
  imageSource: ImageSourcePropType,
  navigation: any,
  location: DonationCentre
}

const DonationCard = ({ name, progress, imageSource, navigation, location }: DonationCardProps) => {
  const progressPercentage: DimensionValue = `${(1 - progress) * 115 - 15}%`

  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate("DetailsScreen", { facility: location })}>
      <Image source={imageSource} style={styles.cardImage} />
      <LinearGradient style={styles.cardArrowCircle} colors={['#D31823', '#FFD43D']} start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 1 }} locations={[0, 1]}>
        <Image source={arrow} style={styles.cardArrow} />
      </LinearGradient>
      <Text style={styles.cardTitle}>{name}</Text>
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
              right: progressPercentage,
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
      <Text style={styles.progressText}>{progress * 100}% of goal completed</Text>
    </Pressable>
  );
}

const ShadowButton = ({ shadow = true, children, style, ...props }) => {
  return (
    <>
      <View style={[shadow ? styles.shadowContainer : null, style, { backgroundColor: style.backgroundColor }]} />
      <Pressable style={[styles.shadowButtonContainer, style, { backgroundColor: style.buttonColor, zIndex: 1000 }]} {...props}>
        <View style={styles.buttonContainer}>
          {children}
        </View>
      </Pressable>
    </>
  );
}

const selectedBarPos = 0;

function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const scrollViewRef = useRef(null);

  const [subheadings, cardContent] = facilities.reduce(
    (acc, { category, locations }, index) => {
      acc[0].push(
        <Pressable key={index} onPress={() => { setSelectedCategory(index); scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false }) }}>
          <Text style={styles.featuredSubheading}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          <View style={[styles.selectedBar, { display: selectedCategory == index ? 'flex' : 'none' }]} />
        </Pressable>
      );
      acc[1].push(
        locations
          .filter((location) => location.featured)
          .map((location: DonationCentre, locationIndex) => {
            return (<DonationCard
              key={locationIndex}
              name={location.cardName}
              progress={location.progress}
              imageSource={location.thumbnail}
              location={location}
              navigation={navigation}
            />);
          })
      );
      return acc;
    },
    [[], []]
  );


  return (
    <Screen style={styles.screen}>
      <Pressable style={styles.profileThumbnailContainer} onPress={() => navigation.navigate("ProfileScreen")}>
        <Image source={require('../assets/profile_pic.png')} style={styles.profilePic} />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.title}><Text style={styles.titleEmph}>Hello, </Text>Ariel! 👋</Text>
        <Text style={styles.subTitle}>how do you feel about starting your day with a donation?</Text>
      </View>
      <View style={styles.pictureContainer}>
        <Image source={require('../assets/mittens.png')} style={styles.mittens} />
        <Image source={require('../assets/phone_camera.png')} style={styles.cameraPic} />
        <Image source={require('../assets/mittens.png')} style={[styles.mittens, styles.miniMittens]} />
        <ShadowButton style={styles.galleryButton} onPress={() => console.log('Opening gallery')}>
          <Image source={require('../assets/gallery_icon.png')} style={styles.galleryIcon} />
        </ShadowButton>
        <Text style={styles.or}>&ndash; or &ndash;</Text>
        <ShadowButton style={styles.photoButton} onPress={() => console.log("Taking a photo")}>
          <Image source={require('../assets/camera_icon.png')} style={styles.cameraIcon} />
          <Text style={styles.photoText}> take a photo</Text>
        </ShadowButton>
      </View>
      <View style={styles.featuredContainer}>
        <View>
          <Text style={styles.featuredHeading}>Featured Donation Centres</Text>
        </View>
        <View style={styles.featuredSubheadingContainer}>
          {subheadings}
        </View>
        <View style={styles.cardContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.scrollViewContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            fadingEdgeLength={300}>
            {cardContent[selectedCategory]}
          </ScrollView>
        </View>
      </View>
      <View style={styles.viewContainer}>
        <Pressable style={styles.viewThumbnailContainer} onPress={() => { console.log("Opening map view"); navigation.navigate("MapScreen"); }}>
          <Image source={require('../assets/map_thumbnail.png')} style={styles.viewThumbnail} />
          <ShadowButton shadow={false} style={styles.viewButton} disabled={true}>
            <Text style={styles.viewText}>view map</Text>
          </ShadowButton>
        </Pressable>
        <Pressable style={styles.viewThumbnailContainer} onPress={() => navigation.navigate("ListViewScreen")}>
          <Image source={require('../assets/list_thumbnail.png')} style={styles.viewThumbnail} />
          <ShadowButton shadow={false} style={styles.viewButton} disabled={true}>
            <Text style={styles.viewText}>view list</Text>
          </ShadowButton>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = EStyleSheet.create({
  screen: {
    paddingHorizontal: '5.6%',
  },
  profileThumbnailContainer: {
    position: 'absolute',
    right: 0,
    top: '4.8%',
    backgroundColor: '#C2D1D9',
    width: '29.48%',
    height: '10.23%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    paddingLeft: '4.12%',
  },
  profilePic: {
    borderRadius: 100,
    height: '86.2%',
    width: undefined,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  titleContainer: {
    top: '11.5%',
    width: '100%',
    height: '7.76%',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Kumbh Sans-Light',
    fontSize: '1.125rem',
    letterSpacing: '0.09rem',
    color: '$textColor',
  },
  titleEmph: {
    fontFamily: 'Kumbh Sans-SemiBold',
    color: '$emphTextColor'
  },
  subTitle: {
    fontFamily: 'Ubuntu-LightItalic',
    fontSize: '0.625rem',
    letterSpacing: '0.05rem',
    color: '$textColor',
  },
  pictureContainer: {
    position: 'absolute',
    width: '100%',
    height: '24.16%',
    backgroundColor: '#E1ECF2',
    borderRadius: 20,
    top: '23.5%',
  },
  mittens: {
    height: '100%',
    width: undefined,
    aspectRatio: 728 / 720,
    transform: [
      { rotateZ: '-60deg' },
    ],
    alignSelf: 'center',
    zIndex: 1000,
    top: '-3%',
  },
  miniMittens: {
    position: 'absolute',
    alignSelf: 'auto',
    height: '25.55%',
    right: '15%',
    top: '16.82%',
  },
  cameraPic: {
    position: 'absolute',
    height: '110.22%',
    width: undefined,
    aspectRatio: 3072 / 3000,
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 20,
  },
  shadowContainer: {
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 4,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.06,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryButton: {
    position: 'absolute',
    top: '36.55%',
    left: '2.74%',
    backgroundColor: '#E1ECF2',
    buttonColor: 'rgba(255, 255, 255, 0.7)',
    width: undefined,
    height: '26.28%',
    aspectRatio: 1,
    borderRadius: 50,
  },
  galleryIcon: {
    height: '63.89%',
    width: undefined,
    aspectRatio: 1,
  },
  or: {
    position: 'absolute',
    top: '44%',
    left: '16.77%',
    fontFamily: 'Ubuntu-RegularItalic',
    fontSize: '0.5625rem',
    letterSpacing: '0.03375rem',
    color: '$textColor',
  },
  photoButton: {
    position: 'absolute',
    bottom: '5.84%',
    left: '2.74%',
    backgroundColor: '#E1ECF2',
    width: '44.52%',
    height: '26.28%',
    borderRadius: 50,
    buttonColor: 'rgba(255, 255, 255, 0.7)'
  },
  cameraIcon: {
    height: '69.4%',
    width: undefined,
    aspectRatio: 1,
  },
  photoText: {
    fontFamily: 'Kumbh Sans-SemiBold',
    color: '$emphTextColor',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
  },
  featuredContainer: {
    position: 'absolute',
    width: '100%',
    height: '28%',
    top: '51%',
  },
  featuredHeading: {
    fontFamily: 'Kumbh Sans-SemiBold',
    letterSpacing: '0.06rem',
    fontSize: '0.75rem',
    color: '$emphTextColor',
  },
  featuredSubheadingContainer: {
    marginTop: '0.45rem',
    height: '19.35%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredSubheading: {
    fontFamily: 'Ubuntu-Light',
    fontSize: '0.625rem',
    letterSpacing: '0.05rem',
    color: '$textColor',
  },
  selectedBar: {
    position: 'absolute',
    height: 0,
    width: '2.6875rem',
    borderWidth: 2,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: '#B5CAD6',
    top: '55%',
    left: selectedBarPos,
  },
  cardContainer: {
    flex: 1,
  },
  scrollViewStyle: {
    marginHorizontal: -30,
    marginBottom: -30,
  },
  scrollViewContent: {
    gap: '0.69rem',
    paddingBottom: 30, // must be negative of scrollViewStyle marginBottom above for bottom shadow to show
    paddingHorizontal: 30, // see ^
  },
  card: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '100%',
    width: undefined,
    aspectRatio: 123 / 101,
    borderRadius: 10,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.07,
    elevation: 2,
  },
  cardImage: {
    height: '58.42%',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardArrowCircle: {
    position: 'absolute',
    backgroundColor: 'white',
    right: '4%',
    top: '48.42%',
    borderRadius: 50,
    height: '20%',
    width: undefined,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.06,
    elevation: 1,
    zIndex: 1000,
  },
  cardArrow: {
    width: '45%',
    height: undefined,
    aspectRatio: 40 / 36,
  },
  cardTitle: {
    fontFamily: 'Ubuntu-Light',
    fontSize: '0.5rem',
    letterSpacing: '0.04rem',
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: '5.29%'
  },
  progressBar: {
    width: '89.42%',
    height: '5%',
  },
  progressText: {
    fontFamily: 'Ubuntu-LightItalic',
    fontSize: '0.3125rem',
    letterSpacing: '0.025rem',
    color: 'black',
    alignSelf: 'flex-end',
    marginRight: '6%',
    marginBottom: '6%',
  },
  viewContainer: {
    position: 'absolute',
    top: '82%',
    width: '100%',
    height: '17%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewThumbnailContainer: {
    width: '47.95%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  viewThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewButton: {
    position: 'absolute',
    left: '6.4%',
    bottom: '9.85%',
    width: '58.57%',
    height: '27.47%',
    backgroundColor: 'transparent',
    buttonColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
  },
  viewText: {
    fontFamily: 'Kumbh Sans-SemiBold',
    fontSize: '0.75rem',
    letterSpacing: '0.06rem',
    color: '$emphTextColor',
  }
});

export default HomeScreen;
