import { View, Text, Pressable, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { newSoap } from "../features/soapSlice";

import Soap from "./SoapNote";
import PatientView from "./Patients";
import BottomButtons from "./BottomButtons";

import { ScreenOptions } from "../config/navigator";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export default function Home() {
    return (
        <View style={{width: '100%', height: '100%'}}>
            <Stack.Navigator
                initialRouteName="welcome"
                screenOptions={ScreenOptions}
            >
                <Stack.Screen name='welcome' component={LaunchScreen}  />
                <Stack.Screen name='new patient' component={Soap}  />
                <Stack.Screen name='patients' component={PatientView} />
            </Stack.Navigator>
            <BottomButtons />
        </View>
    )
}

function LaunchScreen({navigation}){
    const dispatch = useDispatch()
    
    function loadNewSoap() {
      navigation.navigate('new patient')
      dispatch(newSoap())
    }
  
    return (
      <View style={styles.LaunchScreen}>
        <Pressable
          style={styles.button}
          onPress={()=>{
            navigation.navigate('patients')
          }}
          >
          <Text style={styles.buttonLabel}>checkup</Text>
        </Pressable>
        <Pressable
          style={Object.assign({}, styles.button, {backgroundColor: 'limegreen'})}
          onPress={loadNewSoap}
          >
          <Text style={{fontSize: 22, fontWeight: 500}}>New Patient</Text>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    LaunchScreen: {
        borderTopWidth: 4,
        borderColor: '#1a1a1a',
        backgroundColor: '#848884',
        height: '100%',
        gap: '5%',
        alignItems: 'center',
        paddingTop: '20%'
    },
    button: {
        backgroundColor: '#1a1a1a',
        height: '15%',
        width: '55%',

        borderRadius: 9,
        textAlign: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'whitesmoke',
        fontSize: 24,
    }
});
