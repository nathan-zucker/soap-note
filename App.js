import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Nav from './components/Nav';
import Soap from './components/SoapNote';
import PatientView from './components/Patients';
import { newSoap } from './features/soapSlice';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Drawer.Navigator>
          <Drawer.Screen name='Home' component={HomeScreen} />
          <Drawer.Screen name='Soap' component={Soap} />
          <Drawer.Screen name='Patients' component={PatientView} />
        </Drawer.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
  const dispatch = useDispatch()
  
  function loadNewSoap() {
    navigation.navigate('Soap')
    dispatch(newSoap())
  }

  return (
    <View style={styles.homeScreen}>
      <Pressable
        style={styles.button}
        onPress={()=>{
          navigation.navigate('Patients')
        }}
        >
        <Text style={{fontSize: 22}}>checkup</Text>
      </Pressable>
      <Pressable
        style={Object.assign({}, styles.button, {backgroundColor: 'limegreen'})}
        onPress={loadNewSoap}
        >
        <Text style={{fontSize: 22, fontWeight: 500}}>New SOAP</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#4d4d4d'
  },
  topPadding: {
    height: '3%',
    width: '100%'
  },
  button: {
    backgroundColor: 'white',
    width: '40%',
    height: '20%',
    margin: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5%'
  },
  homeScreen: {
    backgroundColor: '#3a443a',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'top',
  }
});
