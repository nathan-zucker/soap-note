import {
    View,
    Pressable,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Switch,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { storeSubjective, storeVitalsSnapshot, changeTimerType, toggleTimer } from '../features/soapSlice';
import { addPatient, updatePatient } from '../features/patientsSlice';

import Timer from './Timer';

const Stack = createNativeStackNavigator();

function Subjective({navigation}){
    const dispatch = useDispatch()
    const store = useSelector(state => state.soap)
    const [subjective, updateSubjective] = useState(store.subjective)

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Text>Name: </Text>
            <TextInput
                style={styles.input}
                value={subjective.patientName}
                onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {patientName: value}))}
                placeholder='John Doe'
                autoCapitalize='words'
            />
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <View style={{flexDirection: 'column', width: '20%'}}>
                    <Text>Age: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {age: value}))}
                        value={subjective.age}
                        keyboardType='number-pad'
                    />
                </View>
                <View style={{flexDirection: 'column', width: '20%'}}>
                    <Text>Sex:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {sex: value}))}
                        value={subjective.sex}
                        />

                </View>
            </View>
            <Text>Chief Complaint:</Text>
            <TextInput
                style={styles.input}
                value={subjective.CC}
                onChangeText={(value)=>updateSubjective(Object.assign( {}, subjective, {CC: value} ))}
                />
            <Pressable
                style={styles.button}
                onPress={()=>{
                    dispatch(storeSubjective(subjective))
                    dispatch(addPatient(subjective))
                    navigation.navigate("Vitals")
                }}
                >
                <Text>NEXT</Text>
            </Pressable>

            <Button
                title='dev test'
                onPress={()=>{
                    const testSub = {
                        patientName: 'Jane Doe',
                        age: '32',
                        sex: 'F',
                        CC: 'unknown'
                    }
                    dispatch(storeSubjective(testSub))
                    dispatch(addPatient(testSub))
                    navigation.navigate("Vitals")
                }}
            />

        </View>
    </TouchableWithoutFeedback>
    )
}

function Vitals({navigation}) {
    const patients = useSelector(state => state.patients)
    const soap = useSelector(state => state.soap)
    const patientName = useSelector(state => state.soap.subjective.patientName)

    const dispatch = useDispatch()
    
    const [vitalSnap, setVitalSnap] = useState({
        LOC: '',
        HR: '',
        RR: '',
        skin: '',
    })
    const [timerToggle, toggleTimer] = useState(false)
    const [timerActive, setTimerActive] = useState(false)
    const [timerType, setTimerType] = useState(30)

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

    const submit = (variable1) => {
        console.log('HELLO--->',variable1)
        dispatch(storeVitalsSnapshot(vitalSnap))
        dispatch(updatePatient(Object.assign({}, soap, {
            vitals: [Object.assign({}, vitalSnap, {
                time: new Date().getTime()
            })]
        })))
        navigation.navigate("History")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.vitalsGrid}>
                <View style={styles.vitalsRow}>
                    <View style={Object.assign({}, styles.vitalsBox, {
                            width: '100%',
                        })}
                    >
                        <Text style={styles.vitalsLabel}>Level of Consciousness</Text>
                        <TextInput
                            style={Object.assign({}, styles.input, {width: 120})}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {LOC: value}))}
                            placeholder='AxO 3'
                            />
                    </View>
                </View>
                <View style={{backgroundColor: '#ddd', width: '100%', alignItems: 'center', paddingTop: 10, borderRadius: 7}}>
                    <Switch
                        value={timerToggle}
                        onValueChange={()=>{
                            toggleTimer(prevState => !prevState)
                            switchTimer()
                        }}
                        disabled={timerActive}
                        trackColor={{true: 'gray'}}
                    />
                </View>
                <View style={Object.assign({}, styles.vitalsRow, {
                    backgroundColor: '#ddd',
                    paddingHorizontal: 12,
                    paddingBottom: 6,
                    alignItems: 'flex-end',
                })}>
                    <View style={Object.assign({}, styles.vitalsBox, {
                        borderColor: 'blue',
                    })}>
                        <Text style={styles.vitalsLabel}>Heart Rate</Text>
                        <TextInput
                            style={styles.number}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {HR: value}))}
                            keyboardType='number-pad'
                        />
                        <Text style={{fontSize: 10, color: '#922'}}>per <Text style={{fontWeight: 600, color: 'orangered'}}>{timerType}</Text> seconds</Text>
                    </View>
                    <View style={styles.timer}>
                        <Timer timerType={timerType} />
                    </View>
                    <View style={styles.vitalsBox}>
                        <Text style={styles.vitalsLabel}>Respiratory Rate</Text>
                        <TextInput
                            style={styles.number}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {RR: value}))}
                            keyboardType='number-pad'
                            />
                        <Text style={{fontSize: 10, color: '#922'}}>per <Text style={{fontWeight: 600, color: 'orangered'}}>{timerType}</Text> seconds</Text>
                    </View>
                </View>
                <View style={styles.vitalsRow}>
                    <View style={Object.assign({}, styles.vitalsBox, {
                        width: '100%',
                    })}>
                        <Text style={styles.vitalsLabel}>Skin Color, Temperature, Moisture</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {skin: value}))}
                            />
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Pressable
                        style={Object.assign({}, styles.button, {
                            marginTop: -10,
                        })}
                        onPress={submit}
                        >
                        <Text>NEXT</Text>
                    </Pressable>
                    <Button
                        title='dev test'
                        onPress={()=>submit('hello, there')}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

function History({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.ample}>
                <Text>AMPLE History</Text>

                <View style={styles.ampleRow}>
                    <Text style={styles.ampleLabel}>Allergies: </Text>
                    <TextInput style={styles.ampleInput}></TextInput>
                </View>
                <View style={styles.ampleRow}>
                    <Text style={styles.ampleLabel}>Medication: </Text>
                    <TextInput style={styles.ampleInput}></TextInput>
                </View>
                <View style={styles.ampleRow}>
                    <Text style={styles.ampleLabel}>Past Pertinent Medical History: </Text>
                    <TextInput style={styles.ampleInput}></TextInput>
                </View>
                <View style={styles.ampleRow}>
                    <Text style={styles.ampleLabel}>Last In: </Text>
                    <TextInput style={styles.ampleInput}></TextInput>
                </View>
                <View style={styles.ampleRow}>
                    <Text style={styles.ampleLabel}>Last Out: </Text>
                    <TextInput style={styles.ampleInput}></TextInput>
                </View>

                <Pressable
                        style={styles.button}
                        onPress={()=>{
                            navigation.navigate("Exam")
                        }}
                        >
                        <Text>NEXT</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}

function Exam({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <Text>Exam</Text>
                <Pressable
                        style={styles.button}
                        onPress={()=>{
                            navigation.navigate("History")
                        }}
                        >
                        <Text>NEXT</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default function Soap() {
    const store = useSelector(state=>state)
    //console.log(store)

    return(
        <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name='Subjective' component={Subjective} />
            <Stack.Screen name='Vitals' component={Vitals} />
            <Stack.Screen name='History' component={History} />
            <Stack.Screen name='Exam' component={Exam} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        gap: 5,
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        width: '70%',
        height: 50,
        fontSize: 22,
    },
    number: {
        borderWidth: 2,
        borderRadius: 5,
        width: 50,
        height: 50,
        fontSize: 22,
    },
    button: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        backgroundColor: 'limegreen',
    },
    vitalsGrid: {
        width: '80%',
        marginLeft: '10%',
        justifyContent: 'top',
        alignItems: 'left'
    },
    vitalsRow: {
        height: '22.5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 30,
    },
    vitalsBox: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        width: '35%',
    },
    vitalsLabel: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 3,
    },
    ample: {
        width: '100%',
        height: '100%',
        padding: 10,
        alignItems: 'center',
    },
    ampleRow: {
        width: '80%',
        height: '10%'
    },
    ampleLabel: {
        textDecorationLine: 'underline',
        width: '80%',
        marginLeft: '10%',
    },
    ampleInput: {
        height: '60%',
        width: '90%',
        marginLeft: '5%',
        padding: 3,
        borderWidth: 3,
        borderColor: 'transparent',
        borderBottomColor: 'black',
        borderLeftColor: 'black',
        borderRightColor: 'black',
    },
    timer: {
        width: '20%',
        backgroundColor: '#ddd',
        paddingTop: 8,
        borderRadius: 7,
    }
})
