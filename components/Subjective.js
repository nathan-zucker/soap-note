import {
    View,
    Pressable,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { storeSubjective } from '../features/soapSlice';
import { addPatient } from '../features/patientsSlice';
import usePalette from '../config/styles';

const Colors = usePalette()

export function Subjective({navigation}){
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

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 5,
        height: '100%',
    },
    button: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        backgroundColor: 'limegreen',
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        fontSize: 22,
        padding: 2,
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
})