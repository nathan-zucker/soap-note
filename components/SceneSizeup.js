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

import {
    storePMOI,
    storeSceneSizeup,
} from '../features/soapSlice';

import usePalette from '../config/styles';
import { styles } from '../config/stylesheet';

const Colors = usePalette();

export function SceneSizeup({navigation}){

    const [PMOI, setPMOI] = useState(undefined)
    const [MOI, setMOI] = useState('')
    const [NOI, setNOI] = useState('')

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
