import {
    View,
    Pressable,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    storeVitalsSnapshot,
    storeHistory,
    changeTimerType,
    startStopState,
    storeExam,
    storeAssessment,
    storePlan,
    updatePlan,
} from '../features/soapSlice';

import { addPatient, updatePatient, storeVitalSnap, VitalSnap } from '../features/patientsSlice';
import { cameraOn, cameraOff, savePhoto, setPreview } from '../features/cameraSlice';

import Timer from './Timer';
import ExamCamera from './ExamCamera';

import usePalette from '../config/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './SoapNote';
const Colors = usePalette();

export default function Assessment({navigation}) {
    const dispatch = useDispatch()
    const name = useSelector(state => state.soap.name)
    const [assessment, setAssessment] = useState('')

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[Colors.container, {height: '100%'}]}>
                
                <Text style={[Colors.text, Colors.header]}>description: </Text>
                <TextInput
                    onChangeText={(text) => setAssessment(text)}
                    style={[
                        Colors.textInput,
                        {
                            minHeight: 160,
                            width: '90%',
                            marginHorizontal: '5%',
                            padding: 4,
                        }
                    ]}
                    multiline
                />

                <Pressable
                    style={[styles.button, {alignSelf: 'center'}]}
                    onPress={()=>{
                        assessment && dispatch(storeAssessment(assessment))
                        dispatch(updatePatient({
                            type: 'assessment',
                            name: name,
                            data: assessment,
                        }))
                        navigation.navigate("Plan")
                    }}
                    >
                    <Text>NEXT</Text>
                </Pressable>
                
            </View>
        </TouchableWithoutFeedback>
    )
}