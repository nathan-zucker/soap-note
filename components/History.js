import {
    View,
    Pressable,
    Text,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { storeHistory } from '../features/soapSlice';
import { updatePatient } from '../features/patientsSlice';
import usePalette from '../config/styles';
import { styles } from '../config/stylesheet';

const Colors = usePalette()

export default function History({navigation}) {    
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

