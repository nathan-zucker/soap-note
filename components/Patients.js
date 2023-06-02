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

function DemoChart() {
    return (
        <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
                data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width * 0.75} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            </View>
    )
}

const VitalsChart = (props) => {
    
    const height = 80
    const width = (Dimensions.get("window").width * 0.6 - 12)

    const vitals = props.vitals
    console.log("vitals: ", vitals)
    let times = []
    let HR = []
    let RR = []
    let HRData = []
    for (let i=0; i<vitals.length; i++) {
        times.push(vitals[i].time)
        HR.push(vitals[i].HR)
        RR.push(vitals[i].RR)
        HRData.push([vitals[i].HR*1, vitals[i].time])
    }
    console.log(HRData)

    return (
        <View style={{gap: 5, margin: 5,}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <LineChart
                    data={{
                        datasets: [
                            {
                                data: HR,
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
                            r: "6",
                            strokeWidth: "2",
                            stroke: "orangered"
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
                    <Text style={styles.value}>{HR[HR.length - 1]}</Text>
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
                            r: "6",
                            strokeWidth: "2",
                            stroke: "aqua"
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
                    <Text style={styles.value}>{RR[RR.length - 1]}</Text>
                </View>
            </View>
        </View>
    )

}

//HR={[90, 80, 85, 80, 75]} RR={[23, 22, 21, 20, 19]}

export default function Patients({navigation}) {
    const store = useSelector(state => state)
    console.log("store: ",store);
    
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