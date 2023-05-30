import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Pressable } from 'react-native';

export default function Nav({navigation}) {
    return (
        <View 
            style={styles.container}
        >
            <Pressable
            style={styles.button}
            onPress={()=>{
                console.log('checkup')
                Alert.alert('checkup!')
            }}
            >
                <Text style={{fontSize: 22}}>checkup</Text>
            </Pressable>
            <Pressable
                style={Object.assign({}, styles.button, {
                    backgroundColor: 'limegreen'
                })}
                onPress={()=>
                    navigation.navigate('SOAP')
                }
            >
                <Text style={{fontSize: 22, fontWeight: 500}}>New SOAP</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '12.5%',
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: '5%'
    },
    button: {
        backgroundColor: 'white',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '2.5%'
    }
})