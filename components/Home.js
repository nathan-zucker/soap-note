import { View, Text, Pressable, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";


import { newSoap } from "../features/soapSlice";

import Soap from "./SoapNote";
import PatientView from "./Patients";
import BottomButtons from "./BottomButtons";

import usePalette from "../config/styles";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
const Colors = usePalette()

export default function Home() {
  const patientName = useSelector(state => state.soap.name)
  const pmoi = useSelector(state => state.soap.PMOI)
    return (
        <View style={{width: '100%', height: '100%'}}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={Colors.navigator}
            >
                <Stack.Screen name='Home' id='home' component={LaunchScreen}  />
                <Stack.Screen
                  name='new patient'
                  id='soap'
                  component={Soap}
                  options={{
                    title: (patientName || 'new patient') + (pmoi ? ' \u26A0' : ''),
                  }}
                />
                <Stack.Screen name='patients' id='patients' component={PatientView} />
            </Stack.Navigator>
            {/**
            <BottomButtons />
             * 
             */}
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
      <View style={[Colors.container, styles.LaunchScreen]}>
        <Pressable
          style={[Colors.button, styles.button]}
          onPress={()=>{
            navigation.navigate('patients')
          }}
        >
          <Text style={[Colors.text, styles.buttonLabel]}>checkup</Text>
        </Pressable>
        <Pressable
          style={[Colors.button, styles.button, {backgroundColor: 'limegreen'}]}
          onPress={loadNewSoap}
        >
          <Text style={{fontSize: 22, fontWeight: 500}}>New Patient</Text>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    LaunchScreen: {
        paddingTop: '20%',
        alignItems: 'center',
        height: '100%',
    },
    button: {
        height: '15%',
        width: '55%',
        borderRadius: 9,
        margin: '6%',
    },
    buttonLabel: {
        fontSize: 24,
    }
});
