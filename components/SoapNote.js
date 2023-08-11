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

import { SceneSizeup } from './SceneSizeup';
import { Subjective } from './Subjective';
import Vitals from './Vitals';
import History from './History';

const Colors = usePalette()
const Drawer = createDrawerNavigator()

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

export const styles = StyleSheet.create({
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
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 5,
    },
})
