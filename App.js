import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Nav from './components/Nav';
import Soap from './components/SoapNote';
import Patients from './components/Patients';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Soap' component={Soap} />
          <Stack.Screen name='Patients' component={Patients} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
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
        onPress={()=>
          navigation.navigate('Soap')
          }
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
