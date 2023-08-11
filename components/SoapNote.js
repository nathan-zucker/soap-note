import {
    StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import usePalette from '../config/styles';

import { SceneSizeup } from './SceneSizeup';
import { Subjective } from './Subjective';
import Vitals from './Vitals';
import History from './History';
import Exam from './Exam';
import Assessment from './Assessment';
import Plan from './Plan';

const Colors = usePalette()
const Drawer = createDrawerNavigator()

export default function Soap() {
    return(
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                initialRouteName='Scene Size-up'
                screenOptions={Colors.navigator}
            >
                <Drawer.Screen name='Scene Size-up' component={SceneSizeup} />
                <Drawer.Screen name='Subjective' component={Subjective} />
                <Drawer.Screen name='Vitals' component={Vitals}/>
                <Drawer.Screen name='History' component={History}/>
                <Drawer.Screen name='Exam' component={Exam}/>
                <Drawer.Screen name='Assessment' component={Assessment}/>
                <Drawer.Screen name='Plan' component={Plan}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 5,
        height: '100%',
    },
    input: {
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        fontSize: 22,
        padding: 2,
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
    vitalsChart: {
        backgroundColor: Colors.container.backgroundColor,
        width: '100%',
    },
    vitalsRow: {
        height: '15%',
        width: '95%',
        marginLeft: '2.5%',
        flexDirection: 'row',
        borderBottomColor: Colors.text.color,
        borderBottomWidth: 2,
        alignItems: 'center',
        gap: 5,
    },
    vitalsLabel: {
        textAlign: 'right',
        width: '100%',
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
        color: Colors.text.color,
    },
    ampleInput: {
        height: '60%',
        width: '90%',
        marginLeft: '5%',
        padding: 3,
        backgroundColor: Colors.textInput.backgroundColor,
        color: Colors.textInput.color,
    },
    timer: {
        borderColor: 'whitesmoke',
        borderWidth: 2,
        width: 120,
        height: 120,
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerSwitch: {
        borderWidth: 2,
        borderColor: 'whitesmoke',
        borderRadius: '100%',
        padding: 5,
        position: 'absolute',
        backgroundColor: Colors.container.backgroundColor,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 5,
    },
})
