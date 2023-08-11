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

export default function Plan({navigation}) {
    const dispatch = useDispatch()
    const name = useSelector(state => state.soap.name)
    const [plan, setPlan] = useState('')
    const actionItems = useSelector(state => state.soap.plan.actionItems)
    const soap = useSelector(state => state.soap)
    
    function ActionItem({item, drag, isActive}) {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        { height: 100, alignItems: 'center', justifyContent: 'center', },
                        { backgroundColor: isActive ? "red" : item.backgroundColor },
                    ]}
                >
                    <Text style={Colors.text}>{item.text}</Text>
                </TouchableOpacity>
            </ScaleDecorator>
        )
    }

    function AddActionItem({items}) {
        const dispatch = useDispatch()
        const [newActionItem, setNewActionItem] = useState()
        const [newText, setNewText] = useState('')

        const key = items.length + 1;

        return (
            <View style={[Colors.container, {height: 80, width: '90%', marginHorizontal: '5%', marginVertical: '2%'}]}>
                <Pressable onPress={()=>{
                    console.log('add action item')
                    dispatch(updatePlan({
                        type: 'add-action-item',
                        text: newText,
                        key: key || 0,
                    }))
                }}>
                <Text style={Colors.header}>Add an Action Item</Text>
                <TextInput
                    value={newText}
                    onChangeText={(e)=>setNewText(e)}
                    multiline
                    style={[Colors.textInput, {height: 50}]}
                />
                    <Ionicons name='checkmark-circle-outline' style={Colors.icon} />
                </Pressable>
            </View>
            )
        }

    return (
        <View style={Colors.container}>
            
            <View style={[Colors.container, {height: '30%'}]}>
                <Pressable
                    style={[styles.button, {alignSelf: 'center', marginTop: 5}]}
                    onPress={()=>{
                        dispatch(updatePatient({
                            type: 'plan',
                            name: name,
                            data: soap.plan,
                        }))
                        navigation.navigate('Vitals')
                    }}
                >
                    <Text>FINISH</Text>
                </Pressable>

                <AddActionItem items={actionItems} />

            </View>

            <DraggableFlatList
                data={actionItems}
                onDragEnd={({data}) => {
                    dispatch(updatePlan({
                        type: 'update-action-items',
                        actionItems: data,
                    }))
                }}
                onRelease={()=>{console.log('released')}}
                keyExtractor={(item) => item.key}
                renderItem={ActionItem}
                style={{height: '70%'}}
            />
        </View>
    )
}