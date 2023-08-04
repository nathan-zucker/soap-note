import { View, Text, Pressable, Button, StyleSheet, Dimensions, Alert } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import React, {useEffect, useState} from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Ionicons from '@expo/vector-icons/Ionicons';

import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";


import VitalsCheckup from "./VitalsCheckup";

import { updatePatient } from "../features/patientsSlice";
import { loadPatient, changeTimerType, newSoap } from "../features/soapSlice";
import usePalette from "../config/styles";
import { ScreenOptions } from "../config/navigator";

const PatientDrawer = createDrawerNavigator();
const Colors = usePalette()

function Patient({navigation, data}) {
    const dispatch = useDispatch();

    function deletePatient(name) {
        let displayName = name || `Unknown Patient`
        
        Alert.alert(`Delete ${displayName}`, `Are you sure you want to erase all patient data for ${displayName}?`, [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => console.log('cancel pressed'),
            },
            {
                text: 'OK',
                onPress: () => console.log('delete patient...', name)
            }
        ])
    }

    function gotoVitals() {
        console.log('taking new vital snapshot..')
    }

    function menu(name) {
        console.log('opening options')
        Alert.alert(`Update ${name}`, 'navigate to where you left off...', [
            {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => console.log('cancel pressed'),
            },
            {
                text: 'Go to SOAP',
                onPress: () => loadSoap(name, data),
            }
        ])
    }

    function loadSoap(name, data) {
        console.log('loading soap note --->', name, data)
        dispatch(loadPatient(data))
        console.log('NAVIGATE TO SOAP')
        
    }

    return (
        <View key={data.name} style={styles.card}>
            <View style={styles.patientHeader}>
                <View>
                    <Text style={{fontWeight: 500}}>{data.name} {data.subjective.age} {data.subjective.sex}</Text>
                    <Text>CC: {data.subjective.CC}</Text>
                </View>
                <View style={{
                    borderWidth: 2, borderColor: 'transparent',
                    flexDirection: "row", gap: 12,
                }}>
                <Pressable 
                    onPress={gotoVitals}
                    >
                    <Ionicons name="clipboard" size={32} color="gray" />
                </Pressable>
                <Pressable
                    onPress={() => menu(data.name)}
                    >
                    <Ionicons name="menu" size={32} color="gray" />
                </Pressable>
                </View>
            </View>

            <View style={styles.vitals}>
                <VitalsChart vitals={data.vitals} />
            </View>
                    
            <View>
                <Text>Exam:</Text>
            </View>
                    
            <View>
                <Text>Plan:</Text>
            </View>

            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable
                    style={{backgroundColor: 'orangered', flexDirection: 'row', justifyContent: 'center', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 15,}}
                    onPress={() => deletePatient(data.name)}    
                    >
                    <Ionicons name="close-circle-outline" size={16} color="black" />
                    <Text>Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}

const VitalsChart = (props) => {

    if (props.vitals.length === 0) { return }
    
    const height = 80
    const width = (Dimensions.get("window").width * 0.6 - 12)

    const vitals = props.vitals
    //console.log("vitals: ", vitals)
    let times = []
    let HR = []
    let RR = []
    let HRData = []
    for (let i=0; i<vitals.length; i++) {
        times.push(vitals[i].time)
        HR.push(vitals[i]['HR']*1)
        RR.push(vitals[i]['RR'])
        HRData.push([vitals[i].HR*1, vitals[i].time])
    }
    //console.log(HRData)

    return (
        <View style={{gap: 5, margin: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <LineChart
                    data={{
                        datasets: [
                            {
                                data: HR,
                                time: times,
                                strokeWidth: 3,
                            },
                        ]
                    }}
                    width={width}
                    height={height}
                    yAxisSuffix="bpm"
                    chartConfig={{
                        backgroundColor: "transparent",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => 'black',
                        labelColor: (opacity = 1) => 'black',
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "7",
                        }
                        }}
                        getDotColor={(d, i) => {
                            if (d <= 100 && d >= 60) {
                                return 'limegreen';
                            }
                            else {
                                return 'orangered';
                            }
                        }}
                        bezier
                        style={{
                            borderRadius: 5,
                            borderColor: 'black',
                            borderWidth: 3,
                            width: width + 8,
                        }}
                    
                />
                <View style={styles.box}>
                    <Text style={styles.label}>HR:</Text>
                    <Text style={Object.assign({}, styles.value, {
                        color: (()=>{
                            let hr = HR[HR.length - 1]
                            if (hr >= 60 && hr <= 100) {
                                return 'limegreen';
                            }
                            else {
                                return 'orangered';
                            }
                        })()
                    })}>{HR[HR.length - 1]}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <LineChart
                    data={{
                        datasets: [
                            {
                                data: RR,
                                time: times,
                            },
                        ]
                    }}
                    width={width}
                    height={height}
                    yAxisSuffix="bpm"
                    chartConfig={{
                        backgroundColor: "transparent",
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => 'black',
                        labelColor: (opacity = 1) => 'black',
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "7",
                        }
                        }}
                        getDotColor={(d, i) => {
                            if (d <= 20 && d >= 12) {
                                return 'limegreen';
                            }
                            else {
                                return 'orangered';
                            }
                        }}
                        bezier
                        style={{
                            borderRadius: 5,
                            borderColor: 'black',
                            borderWidth: 3,
                            width: width + 8,
                        }}
                    
                />
                <View style={styles.box}>
                    <Text style={styles.label}>RR:</Text>
                    <Text style={Object.assign({}, styles.value, {
                        color: (()=>{
                            let rr = RR[RR.length - 1]
                            if (rr >= 12 && rr <= 20) {
                                return 'limegreen';
                            }
                            else {
                                return 'orangered';
                            }
                        })()
                    })}>{RR[RR.length - 1]}</Text>
                </View>
            </View>
        </View>
    )

}

function HomeScreen() {

    const patientsData = useSelector((state) => state.patients)
    const soapNote = useSelector((state) => state.soap)

    const[patientsAndSoap, setPatientsAndSoap] = useState()

    useEffect(()=>{
        setPatientsAndSoap([...patientsData, soapNote])
    },[patientsData, soapNote, setPatientsAndSoap])

    const patientNames = patientsData.map((patient) => patient.name)

    //~~~~~~~~~~~~~~~~~~~~~~~
    
    function PatientPreview({data}) {
        return (
            <View style={Colors.container}>
                <Text style={Colors.text}>{data.PMOI ? <Text style={[Colors.text, {color: 'orangered'}]}> \u26A0</Text> : null}{data.name}</Text>
            </View>
        )
    }
    
    //~~~~~~~~~~~~~~~~~~~~~~~

    
    return (
        <View style={[Colors.container, {height: '100%'}]}>
            <Text style={Colors.text}>Here is a sub-menu of all the patients</Text>
            
            <View>
                {patientsData.map(d => <PatientPreview data={d} key={d.name}/>)}
            </View>

            <Button title="console log patient data" onPress={() => {
                patientsData.forEach(d => console.log(d.name, d.vitals[d.vitals.length - 1], (d.PMOI ? 'MOI!!' : null)))
            }} />
        </View>
    )
}

const Drawer = createDrawerNavigator();

export default function PatientView() {
    const patients = useSelector(state => state.patients)

    return(
        <Drawer.Navigator
            initialRouteName="Patient Overview"
            screenOptions={Colors.navigator}
        >
            <Drawer.Screen name='Patient Overview' component={HomeScreen} />
            {patients.map(patient => <Drawer.Screen name={patient.name} key={patient.name} children={()=><Patient data={patient}/>} />)}
            {/**
            
             */}
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        gap: 5,
        paddingTop: 5,
    },
    card: {
        width: '80%',
        borderWidth: 2,
        borderColor: 'black',
        padding: 2,
    },
    vitals: {
    },
    label: {
        fontSize: 20,
    },
    value: {
        fontSize: 25,
        fontWeight: 500,
    },
    box: {
        borderWidth: 2,
        borderColor: 'black',
        width: '20%',
        height: 80,
        alignItems: 'center',
        marginLeft: 2,
    },
    patientHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})