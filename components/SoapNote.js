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
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    storePMOI,
    storeSceneSizeup,
    storeSubjective,
    storeVitalsSnapshot,
    storeHistory,
    changeTimerType,
    toggleTimer,
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
import { DemoDraglist } from './DemoDraglist';


import usePalette from '../config/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SceneSizeup } from './SceneSizeup';

const Colors = usePalette()
const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator();

function SceneSizeupOld({navigation}){

    const soap = useSelector(state=>state.soap)
    const [PMOI, setPMOI] = useState(undefined)
    const [MOI, setMOI] = useState('')
    const [NOI, setNOI] = useState('')
    const [moiIcon, setMoiIcon] = useState('flash-off')

    const dispatch = useDispatch()

    function submit() {
        dispatch(storeSceneSizeup({
            PMOI: PMOI,
            MOI: MOI,
            NOI: NOI,
        }))
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[Colors.container, {height: '100%'}]}>
                <Text style={[Colors.text, {fontSize: 45, textAlign: 'center', color: 'orangered'}]}>STOP!</Text>
                <Text style={[Colors.text, {textAlign: 'center'}]}>Look around the scene for any safety hazards.</Text>
                <Text style={[Colors.text, {textAlign: 'center'}]}>Look at the patient and determine what happened.</Text>
                <View>
                    <Text style={[Colors.text, {textAlign: 'center', color: 'orangered', fontSize: 25, marginTop: 10}]}>Positive MOI?</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 10,
                        margin: 10,
                    }}>
                        <Pressable
                            onPress={()=>{
                                dispatch(storePMOI(false))
                                setPMOI(false)
                            }}
                            style={[Colors.button, PMOI === undefined ? {} : PMOI ? Colors.disabled : Colors.buttonSelected, {width: 60, height: 40}]}
                        >
                            <Text style={{
                                fontWeight: 500,
                                fontSize: 25,
                                textAlign: 'center',
                                color: PMOI === 'undefined' ? 'whitesmoke' : ( PMOI ? Colors.disabled.color : Colors.text.color ),
                            }}>NO</Text>
                        </Pressable>

                        <Pressable
                            onPress={()=>{
                                dispatch(storePMOI(true))
                                setPMOI(true)
                            }}
                            style={{
                                width: 60,
                                height: 40,
                                backgroundColor: PMOI === undefined ? 'orange' : PMOI ? 'orangered' : Colors.disabled.backgroundColor,
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={{
                                fontWeight: 500,
                                fontSize: 25,
                                textAlign: 'center',
                                color: PMOI === undefined ? 'black' : ( PMOI ? 'whitesmoke' : Colors.disabled.color),
                            }}>YES</Text>
                        </Pressable>
                    </View>
                    {/* <Ionicons name={soap.PMOI ? 'flash' : 'flash-off'} style={[Colors.text, {fontSize: 32, textAlign: 'center'}]} /> */}
                </View>
                <Text style={[Colors.text, {textAlign: 'center'}]}></Text>

                <View style={{width: '95%', marginLeft: '2.5%'}}>
                    <Text style={Colors.text}>Mechanism of Injury:</Text>
                    <TextInput
                        style={Colors.textInput}
                        multiline
                        onChangeText={(e)=>setMOI(e)}
                    />
                    
                    <Text style={[Colors.text, {marginTop: 10}]}>Nature of Illness:</Text>
                    <TextInput
                        style={Colors.textInput}
                        multiline
                        onChangeText={(e)=>setNOI(e)}
                    />
                </View>

                <View style={{alignItems: 'center'}}>
                    <Pressable
                        style={styles.button}
                        onPress={()=>{
                            navigation.navigate("Subjective")
                            submit()
                        }}
                    >
                    <Text>NEXT</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

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

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[Colors.container, styles.container, {paddingTop: 10}]}>
            <Text style={[Colors.text, {width: '70%', textAlign: 'left'}]}>Name: </Text>
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
            
            <Text style={[Colors.text, {width: '70%', textAlign: 'left'}]}>Chief Complaint:</Text>
            <Pressable style={{width: '70%'}}>
                <TextInput
                    style={[Colors.textInput, styles.input]}
                    value={subjective.CC}
                    multiline
                    onChangeText={(value)=>updateSubjective(Object.assign( {}, subjective, {CC: value} ))}
                    />

            </Pressable>

            <Text style={[Colors.text, {width: '70%', textAlign: 'left'}]}>General Impression:</Text>
            <Pressable style={{width: '70%'}}>
                <TextInput
                    style={[Colors.textInput, styles.input]}
                    value={subjective.impression}
                    multiline
                    onChangeText={(value)=>updateSubjective(Object.assign( {}, subjective, {impression: value} ))}
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
                        CC: 'unknown',
                        impression: 'prone near bed, no obvious wounds'
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

function History({navigation}) {    
    const dispatch = useDispatch()
    const name = useSelector(state => state.soap.name)
    const [symptoms, updateSymptoms] = useState('')
    const [allergies, updateAllergies] = useState('')
    const [medications, updateMedications] = useState('')
    const [PPMH, updatePPMH] = useState('')
    const [lastOral, updateLastOral] = useState('')
    const [events, updateEvents] = useState('')

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
        dispatch(updatePatient({
            name: name,
            type: 'history',
            data: sample,
        }))
    }

    function testJane() {
        const testJaneObj = {
            symptoms: 'L ankle pain, swelling, bruising',
            allergies: 'none',
            medications: 'none',
            PPMH: 'none',
            lastOral: 'last night snacks',
            events: 'fell and got foot jammed in crevasse, hyperextending the ankle.'
        }
        dispatch(storeHistory(testJaneObj))
        dispatch(updatePatient({
            name: name,
            type: 'history',
            data: testJaneObj,
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
    const name = useSelector(state => state.soap.name)
    const cameraActive = useSelector(state => state.camera.active)
    const photos = useSelector(state => state.camera.photos)
    const [examDescription, setExamDescription] = useState('')

    function Thumbnails ({photos}) {
        const dispatch = useDispatch()
        return photos.map((photo, i) => {
            return (
                <Pressable key={i} style={styles.thumbnail} onPress={()=>{
                    dispatch(setPreview(i))
                    dispatch(cameraOn())
                }}>
                    <Image
                        source={{uri: photo.uri}}
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
            <View style={[Colors.container, {height: '100%'}]}>

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
                        let exam = {
                            photos: [...photos],
                            description: examDescription,
                        }
                        dispatch(storeExam(exam))
                        dispatch(updatePatient({
                            name: name,
                            type: 'exam',
                            data: exam,
                        }))
                        navigation.navigate("Assessment")
                    }}
                >
                    <Text>NEXT</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}

function Assessment({navigation}) {
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

function Plan({navigation}) {
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

export default function Soap() {
    const store = useSelector(state=>state)
    return(
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                initialRouteName='Scene Size-up'
                screenOptions={Colors.navigator}
            >
                <Drawer.Screen name='Scene Size-up' component={SceneSizeup} />
                <Drawer.Screen name='Subjective' component={Subjective} />
                <Drawer.Screen name='Vitals' component={Vitals}/>
                <Drawer.Screen name='History' component={History}/>
                <Drawer.Screen name='Exam' component={Exam}/>
                <Drawer.Screen name='Assessment' component={Assessment}/>
                <Drawer.Screen name='Plan' component={Plan}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 5,
        height: '100%',
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
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
    vitalsChart: {
        backgroundColor: Colors.container.backgroundColor,
        width: '100%',
    },
    vitalsRow: {
        height: '15%',
        width: '95%',
        marginLeft: '2.5%',
        flexDirection: 'row',
        borderBottomColor: Colors.text.color,
        borderBottomWidth: 2,
        alignItems: 'center',
        gap: 5,
    },
    vitalsLabel: {
        textAlign: 'right',
        width: '100%',
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
        borderColor: 'whitesmoke',
        borderWidth: 2,
        width: 120,
        height: 120,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerSwitch: {
        borderWidth: 2,
        borderColor: 'whitesmoke',
        borderRadius: '100%',
        padding: 5,
        position: 'absolute',
        backgroundColor: Colors.container.backgroundColor,
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
