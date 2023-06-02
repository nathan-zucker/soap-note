import {
    View,
    Pressable,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { storeSubjective, storeVitalsSnapshot } from '../features/soapSlice';

const Stack = createNativeStackNavigator();

function Subjective({navigation}){
    const dispatch = useDispatch()
    const [subjective, updateSubjective] = useState({
        patientName: '',
        age: '',
        sex: '',
        CC: '',
    })

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Text>{subjective.patientName}, {subjective.age} y/o {subjective.sex}</Text>
            <Text>Start entering patient's information.</Text>
            <Text>Name: </Text>
            <TextInput
                style={styles.input}
                value={subjective.patientName}
                onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {patientName: value}))}
                placeholder='John Doe'
                autoCapitalize='words'
                />
            <Text>Age: </Text>
            <TextInput
                style={Object.assign({}, styles.input, {width: '20%', height: '10%'})}
                onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {age: value}))}
                value={subjective.age}
                keyboardType='number-pad'
                />
            <Text>Sex:</Text>
            <TextInput
                style={Object.assign({}, styles.input, {width: '40%'})}
                onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {sex: value}))}
                value={subjective.sex}
                />
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
                    navigation.navigate("Vitals")
                }}
                >
                <Text>NEXT</Text>
            </Pressable>
        </View>
    </TouchableWithoutFeedback>
    )
}

function Vitals({navigation}) {
    /**
     let date = new Date()
     let hour = date.getHours()
     let min = date.getMinutes()
     console.log(hour,':',min)
     
     */

    const dispatch = useDispatch()
    const [vitalSnap, setVitalSnap] = useState({
        LOC: '',
        HR: '',
        RR: '',
        skin: '',
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.vitalsGrid}>
                <View style={styles.vitalsRow}>
                    <View style={styles.vitalsBox}>
                        <Text style={styles.vitalsLabel}>Level of Consciousness</Text>
                        <TextInput
                            style={Object.assign({}, styles.input, {width: 120})}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {LOC: value}))}
                            placeholder='AxO 3'
                            />
                    </View>
                </View>
                <View style={styles.vitalsRow}>
                    <View style={styles.vitalsBox}>
                        <Text style={styles.vitalsLabel}>Heart Rate</Text>
                        <TextInput
                            style={styles.number}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {HR: value}))}
                            keyboardType='number-pad'
                            />
                    </View>
                    <View style={styles.vitalsBox}>
                        <Text style={styles.vitalsLabel}>Respiratory Rate</Text>
                        <TextInput
                            style={styles.number}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {RR: value}))}
                            keyboardType='number-pad'
                            />
                    </View>
                </View>
                <View style={styles.vitalsRow}>
                    <View style={styles.vitalsBox}>
                        <Text style={styles.vitalsLabel}>Skin Color, Temperature, Moisture</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value)=>setVitalSnap(Object.assign({}, vitalSnap, {skin: value}))}
                            />
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Pressable
                        style={styles.button}
                        onPress={()=>{
                            dispatch(storeVitalsSnapshot(vitalSnap))
                            navigation.navigate("History")
                        }}
                        >
                        <Text>NEXT</Text>
                    </Pressable>

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
        height: '25%',
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
    },
    vitalsLabel: {
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
    }
})
