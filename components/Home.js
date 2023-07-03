import { View, Text, Pressable, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { newSoap } from "../features/soapSlice";

import Soap from "./SoapNote";
import PatientView from "./Patients";
import BottomButtons from "./BottomButtons";

import { ScreenOptions } from "../config/navigator";
import { container } from "../config/styles";
import Palette from "../config/styles";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
const Colors = Palette()

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
        gap: '5%',
        paddingTop: '20%'
    },
    button: {
        height: '15%',
        width: '55%',
        borderRadius: 9,
    },
    buttonLabel: {
        fontSize: 24,
    }
});
