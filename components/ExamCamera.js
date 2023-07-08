import { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import {Camera, CameraType} from 'expo-camera';

import { cameraOff, savePhoto } from "../features/cameraSlice";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from "react-redux";

export default function ExamCamera () {
    const dispatch = useDispatch()
    const [type, setType] = useState(CameraType.back)
    const [flashOn, setFlashOn] = useState(false)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [flashIcon, setFlashIcon] = useState('flash-off-outline')
    
    const [permission, requestPermission] = Camera.useCameraPermissions()

    const cameraRef = useRef()

    if (!permission) {
        return (
            <View>
                <Text>permissions loading...</Text>
            </View>
        )
    }
    if (!permission.granted) {
        return (
            <View>
                <Text>enable camera?</Text>
                <Button onPress={requestPermission} title='grant permission.' />
            </View>
        )
    }
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

    return (
        <Camera
            style={styles.container}
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
                <Pressable style={styles.shutter}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '100%',
        justifyContent: 'space-between',
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
    }
})