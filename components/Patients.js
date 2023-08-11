import { View, Text, Pressable, Button, StyleSheet, Dimensions, Alert, ScrollView } from "react-native"
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

import { loadPatient } from "../features/soapSlice";
import usePalette from "../config/styles";

import { IconButton } from "./IconButton";

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
        <ScrollView key={data.name} style={[Colors.container, styles.patientView]} >
            <View style={styles.patientHeader}>
                <View>
                    <Text style={[Colors.text, {fontWeight: 500}]}>{data.name} {data.subjective.age} {data.subjective.sex}</Text>
                    <Text style={Colors.text}>CC: {data.subjective.CC}</Text>
                </View>
                <View style={{
                    borderWidth: 2, borderColor: 'transparent',
                    flexDirection: "row", gap: 12,
                }}>
                <Pressable
                    onPress={() => menu(data.name)}
                    >
                    <Ionicons name="clipboard-outline" style={Colors.icon} />
                </Pressable>
                </View>
            </View>

            <View style={styles.vitals}>
                <VitalsChart vitals={data.vitals} />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20}}>
                    <Text style={Colors.text}>Last checked: {`${new Date(data.vitals[data.vitals.length - 1].time).getHours()}:${new Date(data.vitals[data.vitals.length - 1].time).getMinutes()}`}</Text>
                    <Pressable 
                        style={[Colors.button, {
                            paddingVertical: 3,
                            paddingHorizontal: 10,
                            borderRadius: 3,
                        }]}
                        onPress={()=>{
                            console.log('load data into soap, then navigate.')
                        }}
                    >
                        <Text style={Colors.text}>check up on vitals</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[Colors.container, {marginVertical: 5}]}>
                <Text style={Colors.text}>Plan:</Text>
                {data.plan.actionItems.length >= 1 ?
                    <View>
                        <Text style={Colors.text}>{data.plan.actionItems[0]}</Text>
                        <Pressable
                            style={[Colors.button, {
                                paddingVertical: 5,
                                margin: 5,
                                width: 90,
                                alignSelf: 'center',
                                }]}
                                onPress={()=>{
                                    console.log('expand plan')
                                }}    
                            >
                            <Text style={Colors.text}>Expand</Text>
                        </Pressable>
                    </View>
                :
                    <Text style={Colors.text}>{data.plan.narrative}</Text>
                }
                
            </View>
                    
            <View style={[Colors.container, {marginVertical: 5}]}>
                <Text style={Colors.text}>Exam:</Text>
                <Text style={Colors.text}>{data.exam.description}</Text>
                {/* PHOTO GALLERY */}
            </View>

            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable
                    style={{backgroundColor: 'orangered', flexDirection: 'row', justifyContent: 'center', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 15,}}
                    onPress={() => deletePatient(data.name)}    
                    >
                    <Ionicons name="close-circle-outline" style={[Colors.icon, {fontSize: 16}]} />
                    <Text style={Colors.text}>Delete</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

function dotPress ({dataset, index}) {
    let value = dataset.data[index];
    let date = new Date(dataset.time[index]);
    let time = `${date.getHours()}:${date.getMinutes()}`
    console.log(time, value)
    Alert.alert(`${time}     ${value}bpm`)
    return
}

const vitalsChartConfig = {
    backgroundGradientFrom: Colors.container.backgroundColor,
    backgroundGradientTo: Colors.content.backgroundColor,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => Colors.container.backgroundColor,
    labelColor: (opacity = 1) => Colors.content.color,
    propsForDots: {
        r: "7",
    }
}

const VitalsChart = (props) => {

    if (props.vitals.length === 0) { return }
    
    const height = 100
    const width = (Dimensions.get("window").width * 0.7 - 12)

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

    return (
        <View style={{gap: 10, marginVertical: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <LineChart
                    data={{
                        labels: [...times],
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
                    fromZero={true}
                    fromNumber={Math.max(...HR)+20}
                    onDataPointClick={dotPress}
                    yAxisSuffix='bpm'
                    formatXLabel={(d)=>'hi'}
                    chartConfig={vitalsChartConfig}
                    getDotColor={(d, i) => {
                        if (d <= 100 && d >= 60) {
                            return 'limegreen';
                        }
                        else {
                            return 'orangered';
                        }
                    }}
                    bezier
                    style={styles.chart}
                    
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
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5,}}>
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
                    fromZero={true}
                    fromNumber={Math.max(...RR) + 10}
                    onDataPointClick={dotPress}
                    yAxisSuffix="bpm"
                    chartConfig={vitalsChartConfig}
                        getDotColor={(d, i) => {
                            if (d <= 20 && d >= 12) {
                                return 'limegreen';
                            }
                            else {
                                return 'orangered';
                            }
                        }}
                        bezier
                        style={styles.chart}
                    
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

function HomeScreen({navigation}) {

    const patientsData = useSelector((state) => state.patients)
    const soapNote = useSelector((state) => state.soap)

    const[patientsAndSoap, setPatientsAndSoap] = useState()

    useEffect(()=>{
        setPatientsAndSoap([...patientsData, soapNote])
    },[patientsData, soapNote, setPatientsAndSoap])

    const patientNames = patientsData.map((patient) => patient.name)

    //~~~~~~~~~~~~~~~~~~~~~~~
    
    function PatientPreview({data}) {
        let vitals = data.vitals[data.vitals.length - 1];
        if (vitals === undefined) {
            console.log('ERROR, vitals not logged correctly')
            return;
        }
        return (
            <View style={[Colors.container, styles.patientPreview]}>
                <Pressable
                    onPress={()=>{navigation.navigate(data.name)}}
                >
                    <Text style={Colors.text}>{data.PMOI ? <Text style={[Colors.text, {color: 'orangered'}]}> \u26A0</Text> : null}{data.name}</Text>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 15,}}>
                        <Ionicons name='pulse' style={Colors.icon} />
                        <View>
                            <View style={{flexDirection: 'row', gap: 15}}>
                                <Text style={[Colors.text]}>HR: {vitals.HR}</Text>
                                <Text style={Colors.text}>RR: {vitals.RR}</Text>
                            </View>
                            <View>
                                <Text style={Colors.text}>Last Checked: {Math.floor(new Date(Date.now() - vitals.time) / 60000)} minutes ago</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={Colors.text}>Plan:</Text>
                        <Text style={Colors.text}>{data.plan.narrative}</Text>
                    </View>

                </Pressable>

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
    chart: {
        borderColor: Colors.content.backgroundColor,
        borderWidth: 3,
        borderRadius: 3,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        gap: 5,
        paddingTop: 5,
    },
    patientView: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    patientPreview: {
        borderColor: Colors.textAlt.color,
        borderWidth: 2,
        padding: 5,
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: '2%',
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
        color: Colors.text.color,
    },
    value: {
        fontSize: 25,
        fontWeight: 500,
    },
    box: {
        borderWidth: 2,
        borderColor: Colors.textAlt.color,
        borderRadius: 5,
        width: '20%',
        height: 80,
        alignItems: 'center',
        marginLeft: 2,
    },
    patientHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    }
})