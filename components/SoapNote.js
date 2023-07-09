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
    Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useId } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { storeSubjective, storeVitalsSnapshot, storeHistory, changeTimerType, toggleTimer } from '../features/soapSlice';
import { addPatient, updatePatient, storeVitalSnap } from '../features/patientsSlice';
import { cameraOn, cameraOff, savePhoto } from '../features/cameraSlice';

import Timer from './Timer';
import ExamCamera from './ExamCamera';

import usePalette from '../config/styles';

const Colors = usePalette()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator();

function Subjective({navigation}){
    const dispatch = useDispatch()
    const store = useSelector(state => state.soap)
    const [subjective, updateSubjective] = useState(store.subjective)

    function buttonColors(hook) {
        switch (subjective.sex) {
            case 'none': return {
                backgroundColor: '#3b3d3b',
                borderColor: 'transparent',
            }
            case hook: return {
                borderColor: 'limegreen',
                backgroundColor: '#1a1a1a',
            }
            default: return {
                backgroundColor: '#2a2b2a',
            }
        }
    }
    function inputColors(value ) {
        
    }

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[Colors.container, styles.container]}>
            <Text style={Colors.text}>Name: </Text>
            <Pressable style={{width: '70%'}}>
                <TextInput
                    style={[Colors.textInput, styles.input]}
                    value={subjective.patientName}
                    onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {patientName: value}))}
                    autoCapitalize='words'
                />
            </Pressable>
            
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <View style={{flexDirection: 'column', width: '20%'}}>
                    <Text style={Colors.text}>Age: </Text>
                    <Pressable>
                        <TextInput
                            style={[Colors.textInput, styles.input, {height: 58, fontSize: 30,}]}
                            onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {age: value}))}
                            value={subjective.age}
                            keyboardType='number-pad'
                        />
                    </Pressable>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={[Colors.text, {textDecorationLine: 'underline', marginBottom: 3,}]}>Sex:</Text>
                    <View style={styles.sexOptions}>
                        <Pressable
                            style={[ styles.sexButton, buttonColors('M') ]}
                            onPress={()=>updateSubjective(Object.assign({}, subjective, {sex: 'M'}))}
                            >
                            <Ionicons name='male' size={36} color='#2986CC' />
                        </Pressable>
                        <Pressable
                            style={[ styles.sexButton, buttonColors('F') ]}
                            onPress={()=>updateSubjective(Object.assign({}, subjective, {sex: 'F'}))}
                        >
                            <Ionicons name='female' size={36} color='#C90076' />
                        </Pressable>
                        <Pressable
                            style={[ styles.sexButton, buttonColors('U') ]}
                            onPress={()=>updateSubjective(Object.assign({}, subjective, {sex: 'U'}))}
                            >
                            <Ionicons name='transgender' size={36} color='white' />
                        </Pressable>
                    </View>

                </View>
            </View>
            <Text style={Colors.text}>Chief Complaint:</Text>
            <Pressable style={{width: '70%'}}>
                <TextInput
                    style={[Colors.textInput, styles.input]}
                    value={subjective.CC}
                    onChangeText={(value)=>updateSubjective(Object.assign( {}, subjective, {CC: value} ))}
                    />

            </Pressable>
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

    const submit = () => {

        console.log('SOAP ---> ', soap.name)
        
        dispatch(storeVitalsSnapshot(vitalSnap))
        /*
        LIVE UPDATE THE PATIENT VIEW
        dispatch(updatePatient({
            name: soap.name || patients[patients.length - 1].name,
            type: 'vitals',
            data: vitalSnap,
        }))
        */
        navigation.navigate("History")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={Colors.container}>
            <View style={Colors.container}>
                <View style={styles.vitalsRow}>
                    <View style={Object.assign({}, styles.vitalsBox, {
                            width: '100%',
                        })}
                    >
                        <Text style={[Colors.text, styles.vitalsLabel]}>Level of Consciousness</Text>
                        <TextInput
                            style={[Colors.textInput, styles.input, {width: 120}]}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {LOC: value}))}
                            />
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
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
                <View style={[styles.vitalsRow, {
                    paddingHorizontal: 12,
                    paddingBottom: 6,
                    alignItems: 'center',
                }]}>
                    <View style={styles.vitalsBox}>
                        <Text style={[Colors.text, styles.vitalsLabel]}>Heart Rate</Text>
                        <TextInput
                            style={[Colors.textInput, styles.number]}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {HR: value}))}
                            keyboardType='number-pad'
                        />
                        <Text style={{fontSize: 10, color: '#922'}}>per <Text style={{fontWeight: 600, color: 'orangered'}}>{timerType}</Text> seconds</Text>
                    </View>
                    <View style={styles.timer}>
                        <Timer timerType={timerType} />
                    </View>
                    <View style={styles.vitalsBox}>
                        <Text style={[Colors.text, styles.vitalsLabel]}>Respiratory Rate</Text>
                        <TextInput
                            style={[Colors.textInput, styles.number]}
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
                        <Text style={[Colors.text, styles.vitalsLabel]}>Skin Color, Temperature, Moisture</Text>
                        <TextInput
                            style={[Colors.textInput, styles.input]}
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

    const [symptoms, updateSymptoms] = useState('')
    const [allergies, updateAllergies] = useState('')
    const [medications, updateMedications] = useState('')
    const [PPMH, updatePPMH] = useState('')
    const [lastOral, updateLastOral] = useState('')
    const [events, updateEvents] = useState('')

    const dispatch = useDispatch()

    function submit () {
        const sample = {
            symptoms: symptoms,
            allergies: allergies,
            medications: medications,
            PPMH: PPMH,
            lastOral: lastOral,
            events: events,
        }
        dispatch(storeHistory(sample))
    }

    function testJane() {
        dispatch(storeHistory({
            symptoms: 'L ankle pain, swelling, bruising',
            allergies: 'none',
            medications: 'none',
            PPMH: 'none',
            lastOral: 'last night snacks',
            events: 'fell and got foot jammed in crevasse, hyperextending the ankle.'
        }))
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={Colors.container}>
            <View style={[Colors.container, styles.ample]}>
                <Text style={Colors.text}>SAMPLE History</Text>

                <View style={styles.ampleRow}>
                    <Pressable>
                        <Text style={styles.ampleLabel}>Signs/Symptoms: </Text>
                        <TextInput style={styles.ampleInput} value={symptoms} onChangeText={(e)=>updateSymptoms(e)} />
                    </Pressable>
                </View>
                <View style={styles.ampleRow}>
                    <Pressable>
                        <Text style={styles.ampleLabel}>Allergies: </Text>
                        <TextInput style={styles.ampleInput} value={allergies} onChangeText={(e)=>updateAllergies(e)} />
                    </Pressable>
                </View>
                <View style={styles.ampleRow}>
                    <Pressable>
                        <Text style={styles.ampleLabel}>Medication: </Text>
                        <TextInput style={styles.ampleInput} value={medications} onChangeText={(e)=>updateMedications(e)} />
                    </Pressable>
                </View>
                <View style={styles.ampleRow}>
                    <Pressable>
                        <Text style={styles.ampleLabel}>Past Pertinent Medical History: </Text>
                        <TextInput style={styles.ampleInput} value={PPMH} onChangeText={(e)=>updatePPMH(e)} />
                    </Pressable>
                </View>
                <View style={styles.ampleRow}>
                    <Pressable>
                        <Text style={styles.ampleLabel}>Last Oral Intake: </Text>
                        <TextInput style={styles.ampleInput} value={lastOral} onChangeText={(e)=>updateLastOral(lastOral)} />
                    </Pressable>
                </View>
                <View style={styles.ampleRow}>
                    <Pressable>
                        <Text style={styles.ampleLabel}>Events Leading to Condition:</Text>
                        <TextInput style={styles.ampleInput} value={events} onChangeText={(e)=>updateEvents(e)} />
                    </Pressable>
                </View>

                <Pressable
                        style={styles.button}
                        onPress={()=>{
                            submit()
                            navigation.navigate("Exam")
                        }}
                        >
                        <Text>NEXT</Text>
                </Pressable>
                <Button title='test' onPress={()=>{
                    testJane()
                    navigation.navigate('Exam')
                }} />
            </View>
        </TouchableWithoutFeedback>
    )
}

function Exam({navigation}) {
    const dispatch = useDispatch()

    const [cameraOpen, toggleCameraOpen] = useState(false)
    const cameraActive = useSelector(state => state.camera.active)
    const photos = useSelector(state => state.camera.photos)

    const [examDescription, setExamDescription] = useState('')

    function Thumbnails ({photos}) {
        
        return photos.map((photo, i) => {
            return (
                <Pressable key={i} style={styles.thumbnail}>
                    <Image
                        source={require('../assets/favicon.png')}
                        height={styles.thumbnail.height}
                        width={styles.thumbnail.height}
                    />
                </Pressable>
            )
        })
    }

    function PhotoGallery () {
        return (
            <View>
                <Text style={[Colors.text, {textAlign: 'center', margin: 10, fontSize: 16, textDecorationLine: 'underline',}]}>Photos:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                    <Thumbnails photos={photos} />
                    <Pressable
                        style={[Colors.button, styles.thumbnail]}
                        onPress={()=>dispatch(cameraOn())}
                    >
                        <Ionicons name='add-circle-outline' style={[Colors.text, {fontSize: 50, marginLeft: 3.5, marginTop: 0,}]} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={Colors.container}>

                {cameraActive ? <ExamCamera/> : <PhotoGallery/> }
                
                <View>
                    <Text style={[Colors.text, {marginLeft: '10%'}]}>Description:</Text>
                    <TextInput
                        style={[
                            Colors.textInput,
                            {
                                minHeight: 80,
                                width: '90%',
                                marginHorizontal: '5%',
                                padding: 4,
                            }
                        ]}
                        multiline
                        numberOfLines={4}
                        onChangeText={(e)=>{setExamDescription(e)}}
                    />
                </View>

                <Pressable
                    style={[styles.button, {alignSelf: 'center'}]}
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
            <Drawer.Navigator
                initialRouteName='Subjective'
                screenOptions={Colors.navigator}
            >
                <Drawer.Screen name='Subjective' component={Subjective} />
                <Drawer.Screen name='Vitals' component={Vitals}/>
                <Drawer.Screen name='History' component={History}/>
                <Drawer.Screen name='Exam' component={Exam}/>
            </Drawer.Navigator>
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
        width: '100%',
        height: 50,
        fontSize: 22,
        padding: 2,
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
        color: Colors.text.color,
    },
    ampleInput: {
        height: '60%',
        width: '90%',
        marginLeft: '5%',
        padding: 3,
        backgroundColor: Colors.textInput.backgroundColor,
        color: Colors.textInput.color,
    },
    timer: {
        width: '20%',
        paddingTop: 8,
        borderRadius: 7,
    },
    sexOptions: {
        flexDirection: 'row',
        gap: 5,
        marginHorizontal: 5,
    },
    sexButton: {
        backgroundColor: '#3b3d3b',
        padding: 5,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'transparent',
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 5,
    },
})
