import {
    View,
    Pressable,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Subjective({navigation}){
    const dispatch = useDispatch()
    const [subjective, updateSubjective] = useState({
        patientName: '',
        age: undefined,
        sex: undefined,
    })

    return(    
        <View style={styles.container}>
            <Text>{subjective.patientName}, {subjective.age} y/o {subjective.sex}</Text>
            <Text>Start entering patient's information.</Text>
            <Text>Name: </Text>
            <TextInput
                style={styles.input}
                value={subjective.patientName}
                onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {patientName: value}))}
                placeholder='John Doe'
            />
            <Text>Age: </Text>
            <TextInput
                style={Object.assign({}, styles.input, {width: '20%', height: '10%'})}
                onChangeText={(value)=>updateSubjective(Object.assign({}, subjective, {age: value}))}
                value={subjective.age}
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
            />
            <Pressable
                style={styles.button}
                onPress={()=>{
                    dispatch({type: 'updateSubjective', payload: subjective})
                    navigation.navigate("Vitals")
                }}
                >
                <Text>NEXT</Text>
            </Pressable>
        </View>
    )
}

function Vitals({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Time</Text>
            <TextInput
                style={Object.assign({}, styles.input, {width: 120})}
                />
            <Text>Level of Consciousness</Text>
            <TextInput
                style={Object.assign({}, styles.input, {width: 120})}
            />
            <Text>Heart Rate</Text>
            <TextInput
                style={styles.number}
            />
            <Text>Respiratory Rate</Text>
            <TextInput
                style={styles.number}
            />
            <Text>Blood Pressure</Text>
            <TextInput
                style={styles.number}
            />
            <Text>Skin Color, Temperature, Moisture</Text>
            <TextInput
                style={styles.input}
            />
        </View>
    )
}

export default function Soap() {

    return(
        <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name='Subjective' component={Subjective} />
            <Stack.Screen name='Vitals' component={Vitals} />
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
        backgroundColor: 'limegreen'
    }
})
