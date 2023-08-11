import {
    View,
    Pressable,
    Text,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import {
    storeVitalsSnapshot,
    changeTimerType,
    startStopState,
} from '../features/soapSlice';

import { updatePatient, VitalSnap } from '../features/patientsSlice';
import Timer from './Timer';

import usePalette from '../config/styles';
import { styles } from '../config/stylesheet';

const Colors = usePalette()

export default function Vitals({navigation}) {
    const patients = useSelector(state => state.patients)
    const soap = useSelector(state => state.soap)
    const patientName = useSelector(state => state.soap.subjective.patientName)

    const dispatch = useDispatch()
    
    const initialVitals = {
        factor: 2,
        LOC: '',
        HR: '',
        HRQ: '',
        RR: '',
        RRQ: '',
        skin: '',
    }

    const [vitalSnap, setVitalSnap] = useState(initialVitals)
    const [timerToggle, toggleTimer] = useState(false)
    const [timerActive, setTimerActive] = useState(false)
    const [timerType, setTimerType] = useState(30)
    const playPauseIcon = useSelector(state=>state.soap.timer.icon)
    const factor = useSelector(state => state.soap.timer.factor)

    const switchTimer = () => {
        if (timerType === 30) {
            setTimerType(60)
            dispatch(changeTimerType(60))
        }
        else {
            setTimerType(30)
            dispatch(changeTimerType(30))
        }
    }

    function devTest () {
        const testObj = Object.assign({}, initialVitals, {
            LOC: 'AxO 4',
            HR: 40,
            RR: 7,
            skin: 'pink warm dry',
        })
        dispatch(storeVitalsSnapshot(testObj))

        dispatch(updatePatient({
            name: 'Jane Doe',
            type: 'vitals',
            data: Object.assign({}, new VitalSnap(), testObj)
        }))

        navigation.navigate("History")
    }

    const submit = () => {

        console.log('SOAP ---> ', soap.name, vitalSnap)        
        dispatch(storeVitalsSnapshot(vitalSnap))

        dispatch(updatePatient({
            name: soap.name,
            type: 'vitals',
            data: Object.assign({}, new VitalSnap(), vitalSnap),
        }))

        navigation.navigate("History")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={Colors.container}>
            <View style={[Colors.container, styles.container]}>
                <View style={styles.vitalsChart}>
                    <View style={styles.vitalsRow}>
                        <Text style={[Colors.text, styles.vitalsLabel, {flex: 1}]}>Level of Consciousness</Text>
                        <TextInput
                            style={[Colors.textInput, styles.input, {flex: 1}]}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {LOC: value}))}
                        />
                    </View>

                    <View style={styles.vitalsRow}>
                        <View style={{width: '100%', flexDirection: 'row',}}>
                            <View style={{flexDirection: 'row', flex: 2, justifyContent: 'flex-end', gap: 5, marginRight: 5,}}>
                                <View style={{flexDirection: 'column', alignItems: 'start',}}>
                                    <Text style={[Colors.text, styles.vitalsLabel]}>Heart Rate</Text>
                                    <Text style={[styles.vitalsLabel, {fontSize: 10, color: '#922'}]}>per <Text style={{fontWeight: 600, color: 'orangered'}}>{timerType}</Text> seconds</Text>
                                </View>
                                <TextInput
                                    style={[Colors.textInput, styles.number]}
                                    onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {HR: value}))}
                                    keyboardType='number-pad'
                                />
                            </View>
                            
                            <View style={{flex: 3}}>
                                <Text style={[Colors.text, {flex: 1}]}>Quality</Text>
                                <TextInput
                                    style={[Colors.textInput, {flex: 1}]}
                                    onChangeText={(e) => setVitalSnap(Object.assign({}, vitalSnap, {HRQ: e}))}
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.vitalsRow}>
                        <View style={{width: '100%', flexDirection: 'row',}}>
                            <View style={{flexDirection: 'row', flex: 2, justifyContent: 'flex-end', gap: 5, marginRight: 5,}}>
                                <View style={{flexDirection: 'column', alignItems: 'start',}}>
                                    <Text style={[Colors.text, styles.vitalsLabel]}>Respirations</Text>
                                    <Text style={[styles.vitalsLabel, {fontSize: 10, color: '#922'}]}>per <Text style={{fontWeight: 600, color: 'orangered'}}>{timerType}</Text> seconds</Text>
                                </View>
                                <TextInput
                                    style={[Colors.textInput, styles.number]}
                                    onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {RR: value}))}
                                    keyboardType='number-pad'
                                />
                            </View>

                            <View style={{flex: 3}}>
                                <Text style={[Colors.text, {flex: 1}]}>Quality</Text>
                                <TextInput
                                    style={[Colors.textInput, {flex: 1}]}
                                    onChangeText={(e) => setVitalSnap(Object.assign({}, vitalSnap, {RRQ: e}))}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.vitalsRow, {flexDirection: 'column', paddingTop: 5}]}>
                        <Text style={[Colors.text]}>Skin Color, Temperature, and Moisture</Text>
                        <TextInput
                            style={[Colors.textInput, styles.input]}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {skin: value}))}
                        />
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 25,}}>
                        <View style={styles.timer}>
                            <Pressable
                                style={[styles.timerSwitch, {transform: [{translateX: -45}, {translateY: -45}]}]}
                                onPress={()=>{
                                    toggleTimer(prevState => !prevState)
                                    switchTimer()
                                }}
                                disabled={timerActive}
                            >
                                <Ionicons name='stopwatch-outline' style={[Colors.text, {fontSize: 30, marginBottom: 1}]} />
                            </Pressable>

                            <Pressable
                                style={[styles.timerSwitch, {transform: [{translateX: 45}, {translateY: -45}]}]}
                                onPress={()=>{
                                    dispatch(startStopState())
                                }}
                            >
                                <Ionicons name={playPauseIcon} style={[Colors.text, {fontSize: 30, marginLeft: 2}]} />
                            </Pressable>
                            
                            <View>
                                <Timer timerType={timerType} />
                            </View>
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={styles.button}
                                onPress={submit}
                                >
                                <Text>NEXT</Text>
                            </Pressable>

                            <Button
                                title='dev test'
                                onPress={devTest}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}