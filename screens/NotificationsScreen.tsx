import React, { useContext, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Screen from '../components/Screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import { facilities } from '../facilities';
import { NotifContext } from '../contexts/AppContext';

const Story = ({ thumbnail, accountName }) => {
    return (
        <View style={styles.story}>
            <Image source={thumbnail} style={styles.thumbnail} />
            <View style={styles.online} />
            <Text style={styles.storyAccountName} numberOfLines={1}>{accountName}</Text>
        </View>
    );
}

const Message = ({ readStatus = false, location, message, time, onPress }) => {
    const readMessage = "No problem! Hope people are getting what they need :)";

    return (
        <Pressable style={styles.messageContainer} onPress={onPress}>
            <Image source={location.thumbnail} style={styles.messageThumbnail} />
            <View style={styles.messageBody}>
                <View style={styles.messageHeader}>
                    <Text style={styles.messageAccountName}>{location.name}</Text>
                    <Text style={styles.messageTime}>{time}</Text>
                </View>
                <View style={styles.previewContainer}>
                    {
                        readStatus ?
                            <Image source={require('../assets/read_icon.png')} style={styles.readIcon} />
                            :
                            <View style={styles.unreadIcon} />
                    }
                    <Text style={styles.previewText} numberOfLines={2}>{readStatus ? <><Text style={styles.you}>You: </Text>{readMessage}</> : message}</Text>
                </View>
            </View>
        </Pressable>
    );
}

function NotificationsScreen({ navigation }) {
    const setRead = useContext(NotifContext);
    const online = facilities[0].locations;
    const [readStatus, setReadStatus] = useState(online.map(() => false))
    const messages = [
        {
            message: "Hey there! Thanks for donating a bunch of cans of non-perishable food items! It really helped us out!",
            time: "5:25 pm"
        },
        {
            message: "Hey there! Thanks for donating a bunch of cans of non-perishable food items! It really helped us out!",
            time: "yesterday"
        },
        {
            message: "Hey there! Thanks for donating a bunch of cans of non-perishable food items! It really helped us out!",
            time: "mon"
        },
    ]

    const editRead = (index, readStatus, setReadStatus) => {
        let newReadStatus = readStatus.slice();
        newReadStatus[index] = true;
        setReadStatus(newReadStatus);
        if (newReadStatus.every((val) => val)) {
            console.log("every message read");
            setRead(true);
        }
    }

    return (
        <Screen style={styles.screen}>
            <Pressable style={styles.profileThumbnailContainer} onPress={() => navigation.navigate("ProfileScreen")}>
                <Image source={require('../assets/profile_pic.png')} style={styles.profilePic} />
            </Pressable>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Messages </Text>
                <Image source={require('../assets/love_letter.png')} style={styles.loveLetter} />
            </View>
            <Text style={styles.subtitle}>remember, you can only send one message at a time!</Text>
            <View style={styles.bodyContainer}>
                <View style={styles.storyContainer}>
                    {
                        online.map((location, index) => {
                            return (
                                <Story key={index} thumbnail={location.thumbnail} accountName={location.cardName} />
                            );
                        })
                    }
                    <Image source={require('../assets/search_icon.png')} style={styles.searchIcon} />
                </View>
                {
                    online.map((location, index) => {
                        return (
                            <Message
                                key={index}
                                location={location}
                                readStatus={readStatus[index]}
                                message={messages[index % messages.length].message}
                                time={messages[index % messages.length].time}
                                onPress={() => editRead(index, readStatus, setReadStatus)}
                            />
                        );
                    })
                }
            </View>
            <Image source={require('../assets/messages_girl.png')} style={styles.girl} />
            <View style={styles.bottomShadow} />
        </Screen>
    );
}

const styles = EStyleSheet.create({
    screen: {
        backgroundColor: '#E0EBF0'
    },
    profileThumbnailContainer: {
        position: 'absolute',
        right: 0,
        top: '4.8%',
        backgroundColor: '#C2D1D9',
        width: '26.49%',
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
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: '5.8%',
        marginTop: '17%',
    },
    title: {
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '1.125rem',
        letterSpacing: '0.09rem',
        color: '$emphTextColor'
    },
    loveLetter: {
        width: '1rem',
        height: '1rem',
    },
    subtitle: {
        fontFamily: 'Ubuntu-LightItalic',
        fontSize: '0.625rem',
        letterSpacing: '0.05rem',
        color: '$textColor',
        alignSelf: 'flex-start',
        marginLeft: '5.8%',
        marginTop: '3%',
    },
    bodyContainer: {
        marginTop: '6.66%',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '$pageBackgroundColor',
        paddingHorizontal: '5.79%',
    },
    storyContainer: {
        height: '21.36%',
        flexDirection: 'row',
        gap: '0.8rem',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DBDBDB',
    },
    story: {
        height: '65.72%',
        width: undefined,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    thumbnail: {
        height: '73%',
        width: undefined,
        aspectRatio: 1,
        borderRadius: 100,
    },
    online: {
        position: 'absolute',
        width: '0.6rem',
        height: '0.6rem',
        right: '20%',
        bottom: '25%',
        borderRadius: 50,
        backgroundColor: '#3DDB4D',
        borderWidth: 1,
        borderColor: '$pageBackgroundColor',
    },
    storyAccountName: {
        width: '100%',
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
        color: '$textColor',
    },
    searchIcon: {
        position: 'absolute',
        top: '20%',
        right: '2%',
        width: '1.6rem',
        height: undefined,
        aspectRatio: 1,
    },
    messageContainer: {
        height: '16.15%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DBDBDB',
    },
    messageThumbnail: {
        height: '65.26%',
        width: undefined,
        aspectRatio: 1,
        borderRadius: 100,
        alignSelf: 'center',
        marginLeft: '2.5%',
    },
    messageBody: {
        flex: 1,
        marginLeft: '4.64%',
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '3.8%'
    },
    messageAccountName: {
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '0.625rem',
        color: '$emphTextColor',
        letterSpacing: '0.05rem',
    },
    messageTime: {
        color: '$gray',
        fontFamily: 'Kumbh Sans-Medium',
        fontSize: '0.5rem',
        letterSpacing: '0.04rem',
    },
    previewContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: '1.5%',
    },
    unreadIcon: {
        width: '0.3rem',
        height: '0.3rem',
        backgroundColor: '#FF0000',
        borderRadius: 50,
        marginTop: '1.5%',
        marginHorizontal: '3%',
    },
    previewText: {
        fontFamily: 'Ubuntu-LightItalic',
        fontSize: '0.5625rem',
        letterSpacing: '0.045rem',
        color: '$textColor',
        lineHeight: '0.75rem',
        flex: 1,
        marginRight: '10%',
    },
    readIcon: {
        width: '0.6rem',
        height: undefined,
        aspectRatio: 1,
        marginHorizontal: '1.8%',
    },
    you: {
        fontFamily: 'Ubuntu-Light',
    },
    girl: {
        position: 'absolute',
        bottom: 0,
        width: '89.06%',
        height: undefined,
        aspectRatio: 879 / 321,
    },
    bottomShadow: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        shadowOffset: { width: 1, height: -4 },
        shadowRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 1,
        elevation: 25,
        zIndex: 1000,
    }
});

export default NotificationsScreen;
