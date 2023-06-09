import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";

import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { cameraOff, savePhoto } from "../features/cameraSlice";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from "react-redux";

export default function ExamCamera () {
    const dispatch = useDispatch()
    const [type, setType] = useState(CameraType.back)
    const [flashOn, setFlashOn] = useState(false)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [flashIcon, setFlashIcon] = useState('flash-off-outline')
    const [preview, setPreview] = useState()
    
    const [hasCameraPermission, setHasCameraPermission] = useState()
    const [hasmediaPermission, setHasMediaPermission] = useState()

    const cameraRef = useRef()

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })()
    }, [])

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }
    function toggleFlash() {
        if (flashOn) {
            setFlash(Camera.Constants.FlashMode.off)
            setFlashIcon('flash-off-outline')
        }
        else {
            setFlash(Camera.Constants.FlashMode.on)
            setFlashIcon('flash-outline')
        } 
        setFlashOn(flashOn=>!flashOn)
    }
    let takePicture = async() => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync()
                console.log(data)
                setPreview(data.uri)
            } catch(e) {
                console.error(e)
            }
        }
    }

    return (
        <View>
        {preview ? 
            <View>
                <Image source={{uri: preview}} style={styles.imagePreview} />
                <View style={styles.imageOptions}>
                    <View style={styles.imageOption}>
                        <Ionicons style={styles.imageButton} name='close-circle-outline' />
                        <Text style={styles.imageButtonLabel}>retake</Text>
                    </View>
                    <View style={styles.imageOption}>
                        <Ionicons style={styles.imageButton} name='checkmark-circle-outline' />
                        <Text style={styles.imageButtonLabel}>save</Text>
                    </View>
                    <View style={styles.imageOption}>
                        <Ionicons style={styles.imageButton} name='clipboard-outline' />
                        <Text style={styles.imageButtonLabel}>notes</Text>
                    </View>
                </View>
            </View>
        :
            <Camera
                style={[styles.container, styles.camera]}
                type={type}
                ref={cameraRef}
                flashMode={flash}
            >
                <View style={styles.buttonRow}>
                    <Pressable style={styles.button} onPress={()=>{toggleFlash()}}>
                        <Ionicons name={flashIcon} style={styles.icon} />
                    </Pressable>
                    
                    <Pressable style={styles.button} onPress={()=>{dispatch(cameraOff())}}>
                        <Ionicons name='close-circle-outline' style={styles.icon} />
                    </Pressable>
                </View>
                
                <View style={styles.bottomRow}>
                    <Pressable style={styles.shutter} onPress={takePicture}>
                        <Ionicons name='radio-button-on-sharp' style={[styles.icon, {
                            fontSize: 70,
                        }]} />
                    </Pressable>
                
                    <Pressable style={[styles.button, {
                        position: 'absolute',
                        left: '60%',
                        top: 25,
                    }]} onPress={()=>toggleCameraType()}>
                        <Ionicons name='sync-outline' style={styles.icon} />
                    </Pressable>
                </View>
            </Camera>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '100%',
        justifyContent: 'space-between',
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    buttonRow: {
        height: 34,
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1a1a1a90',
    },
    button: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'whitesmoke',
        fontSize: 20,
    },
    bottomRow: {
        height: 80,
        width: '100%',
        backgroundColor: '#1a1a1a70',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imagePreview: {
        width: '100%',
        height: '90%',
    },
    imageOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 50,
        marginTop: 5,
    },
    imageOption: {
        borderRadius: 5,
        borderColor: 'whitesmoke',
        borderWidth: 2,
        backgroundColor: '#2b2d2b',
        paddingHorizontal: 4,
    },
    imageButton: {
        color: 'whitesmoke',
        fontSize: 36,
        textAlign: 'center',
        marginLeft: 1,
    },
    imageButtonLabel: {
        color: 'whitesmoke',
        fontSize: 14,
        textAlign: 'center',
    }
})