import { View, Text, Pressable, Button, StyleSheet, Dimensions } from "react-native"
import { useSelector } from "react-redux"

import React from 'react';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const VitalsChart = (props) => {
    
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
                        color: (opacity = 1) => 'gray',
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
                            if (hr > 60 && hr < 100) {
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
                            if (rr > 12 && rr < 20) {
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

//HR={[90, 80, 85, 80, 75]} RR={[23, 22, 21, 20, 19]}

export default function Patients({navigation}) {
    const store = useSelector(state => state)
    console.log("store---> ",store);
    
    const patientList = (patients) => {
        return patients.map((patient, i) => {
            return (
                <View key={i} style={styles.card}>
                    <Text style={{fontWeight: 500}}>{patient.name} {patient.age} {patient.sex}</Text>
                    <Text>CC: {patient.subjective.CC}</Text>
                    <View style={styles.vitals}>
                        <VitalsChart vitals={patient.objective.vitals} />
                    </View>
                    <View>
                        <Text>Exam:</Text>
                    </View>
                    <View>
                        <Text>Plan:</Text>
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            <Text>This tab will display active patients and allow you to read and write data.</Text>
            {patientList(store.patients)}
            <Button
                onPress={()=>navigation.navigate('Soap')}
                title='NEW SOAP'
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 30,
        fontWeight: 500,
    },
    box: {
        borderWidth: 2,
        borderColor: 'black',
        width: '20%',
        height: 80,
        alignItems: 'center',
        marginLeft: 2,
    }
})