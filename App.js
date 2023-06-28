import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './components/Home';
import Soap from './components/SoapNote';
import PatientView from './components/Patients';
import { newSoap } from './features/soapSlice';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Home />
      </Provider>
    </NavigationContainer>
  );
}