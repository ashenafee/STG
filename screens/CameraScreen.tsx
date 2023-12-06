import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera, useCameraDevice, CameraPosition } from 'react-native-vision-camera';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';


function CameraScreen({ navigation }) {
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
    const device = useCameraDevice(cameraPosition);
    const [permission, setPermission] = useState(false);
    const camera = useRef<Camera>(null);
    const [photoPath, setPhotoPath] = useState<string | null>(null);

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: { // THIS IS FROM APP.TSX
                backgroundColor: EStyleSheet.value('$pageBackgroundColor'),
                height: '10.57%',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
            },
        });
    }, [navigation]);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermission();
            setPermission(cameraPermission === 'granted');
        })();
    }, []);

    /**
     * Takes a picture using the camera and saves it to the device's camera roll.
     *
     * @return {Promise<void>} A promise that resolves when the picture is taken and saved.
     */
    const takePicture = async (): Promise<void> => {
        console.log(`Taking picture with ${cameraPosition} camera...`);

        // TODO: Figure out how to take pictures on the front camera. The
        // current problem is that the photos only capture when its set to the
        // rear camera - at least on an Android emulator.

        const file = await camera.current.takePhoto();

        await CameraRoll.save(`file://${file.path}`, {
            type: 'photo',
        });

        setPhotoPath(file.path);

        // setTimeout(() => {
        //     setPhotoPath(null);
        // }, 5000);

        console.log("Picture taken");
    };

    /**
     * Switches the camera position between "back" and "front".
     *
     * @return {void} 
     */
    const switchCamera = (): void => {
        setCameraPosition(prevPosition => {
            const newPosition = prevPosition === 'back' ? 'front' : 'back';
            console.log(`Switching camera to ${newPosition}`);
            return newPosition;
        });
    };

    if (!device || !permission) {
        return <View style={styles.container}>
            <Text>Waiting for camera permissions...</Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                device={device}
                isActive={true}
                photo={true}
                ref={camera}
            >
                <Text style={styles.text}>Camera Screen</Text>
            </Camera>
            <TouchableOpacity style={styles.switchCameraButton} onPress={switchCamera}>
                <Icon name="camera-reverse-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
                <Icon name="ellipse-outline" size={70} color="#fff" />
            </TouchableOpacity>

            {photoPath ?
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: `file://${photoPath}` }}
                        style={styles.previewImage}
                    />
                    <Image source={require('../assets/analysis_check.png')} style={styles.analysisCheck} />
                    <Text style={styles.caption}>Analysis Complete!</Text>
                    <Button center='vh' style={styles.retry} onPress={() => setPhotoPath(null)}>
                        <Text style={styles.retryText}>RETRY</Text>
                    </Button>
                    <Button center='vh' style={styles.upload} onPress={()=>navigation.navigate("MapScreen", {filter: "food"})}>
                        <Text style={styles.uploadText}>UPLOAD</Text>
                    </Button>
                </View>
                : <></>
            }
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center'
    },
    text: {
        marginBottom: 50
    },
    switchCameraButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    takePictureButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20
    },
    previewImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    previewContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    analysisCheck: {
        position: 'absolute',
        bottom: '21.45%',
        width: '16.77%',
        height: undefined,
        aspectRatio: 1,
    },
    caption: {
        position: 'absolute',
        top: '80.57%',
        color: 'white',
        fontFamily: 'Kumbh Sans-SemiBold',
        fontSize: '0.75rem',
        letterSpacing: '0.06rem',
    },
    retry: {
        position: 'absolute',
        bottom: '5.4%',
        left: '10%',
        width: '35%',
        height: undefined,
        aspectRatio: 23 / 7,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    retryText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.75rem',
        letterSpacing: '0.125rem',
        color: 'white',
    },
    upload: {
        position: 'absolute',
        bottom: '5.4%',
        right: '10%',
        width: '35%',
        height: undefined,
        aspectRatio: 23 / 7,
        borderRadius: 5,
        backgroundColor: '#D8D8D8'
    },
    uploadText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: '0.75rem',
        letterSpacing: '0.125rem',
        color: '$textColor',
    },
});

export default CameraScreen;
