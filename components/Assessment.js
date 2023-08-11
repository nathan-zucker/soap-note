import {
    View,
    Pressable,
    Text,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import {storeAssessment} from '../features/soapSlice';
import { updatePatient } from '../features/patientsSlice';

import usePalette from '../config/styles';
import { styles } from '../config/stylesheet';
const Colors = usePalette();

export default function Assessment({navigation}) {
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