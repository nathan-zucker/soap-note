import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

import Nav from './components/Nav';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topPadding}></View>
      <Nav />
      <Button
        onPress={() => {
          console.log('You tapped the button!');
        }}
        title="Press Me"
      />
      <Text>Welcome to the SOAP note app!</Text>
      <SafeAreaView>
        <Text>Here is the safe area view.</Text>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#cdcdcd'
  },
  topPadding: {
    height: '3%',
    width: '100%'
  },
  navbar: {
    color: 'whitesmoke',
    backgroundColor: '#1a1a1a',
    width: '100%',
    textAlign: 'center',
    height: '12.5%',
    fontSize: 25,
    display: 'flex',
    justifyContent: 'center',
    padding: '5%'
  },
});
