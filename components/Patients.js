import { View, Text, Pressable, Button, StyleSheet, Dimensions, Alert } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import React, {useEffect} from 'react';
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

export function Patients({navigation}) {
    const dispatch = useDispatch()
    const store = useSelector(state => state)
    const soap = useSelector(state => state.soap)
    const patientsData = useSelector(state => state.patients)

    const patientList = (patients) => {
        
        function deletePatient(name, index) {
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

        function menu(name, index) {
            console.log('opening options')
            Alert.alert(`Update ${name}`, 'navigate to where you left off...', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => console.log('cancel pressed'),
                },
                {
                    text: 'Go to SOAP',
                    onPress: () => loadSoap(name, patientsData[index]),
                }
            ])
        }

        function loadSoap(name, data) {
            console.log('loading soap note --->', name, data)
            dispatch(loadPatient(data))
            navigation.navigate('Soap')
        }

        
        return patients.map((patient, i) => {
            //console.log(patient.name, i)
            return (
                <View key={i} style={styles.card}>
                    <View style={styles.patientHeader}>
                        <View>
                            <Text style={{fontWeight: 500}}>{patient.name} {patient.age} {patient.sex}</Text>
                            <Text>CC: {patient.subjective.CC}</Text>
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
                                onPress={() => menu(patient.name, i)}
                                >
                                <Ionicons name="menu" size={32} color="gray" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.vitals}>
                        <VitalsChart vitals={patient.objective.vitals} />
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
                            onPress={() => deletePatient(patient.name, i)}    
                            >
                            <Ionicons name="close-circle-outline" size={16} color="black" />
                            <Text>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            )
        })
    }
    function createNewSoap() {
        dispatch(newSoap())
        navigation.navigate('Soap')
    }
    
    return (
        <View style={styles.container}>
            {patientList(store.patients)}
            <Button
                onPress={createNewSoap}
                title='NEW PATIENT'
            />
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

const Drawer = createDrawerNavigator();

export default function PatientView() {
    return(
        <Drawer.Navigator >
            <Drawer.Screen name='Patients' component={Patients} />
            <Drawer.Screen name='Checkup' component={VitalsCheckup} />
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