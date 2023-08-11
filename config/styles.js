import { StyleSheet } from "react-native"
import { darkMode } from "./colorPalette"

export const container = {
    backgroundColor: darkMode.background,
    color: 'whitesmoke',
    width: '100%',
    height: '100%',
}

export default function usePalette() {

    return {
        navigator: {
            headerTintColor: 'whitesmoke',
            headerStyle: {
                backgroundColor: '#1a1a1a',
            }
        },
        container: {
            backgroundColor: darkMode.background,
            color: 'whitesmoke',
            padding: 5,
        },
        text: {
            color: 'whitesmoke'
        },
        button: {
            backgroundColor: '#2b2b2b',
        },
        icon: {
            color: 'whitesmoke',
            fontSize: 30,
            textAlign: 'center',
        },
        header: {
            fontSize: 16,
            color: 'whitesmoke',
            marginLeft: 15,
        },
        textAlt: {
            color: '#5b5d5b'
        },
        button: {
            backgroundColor: '#3b3d3b',    
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonSelected: {
            backgroundColor: '#5d5f5d',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        disabled: {
            backgroundColor: '#2a2b2a',
            color: '#5d5f5d',
        },
        textInput: {
            backgroundColor: '#3b3d3b',
            borderColor: 'transparent',
            borderRadius: 5,
            color: 'whitesmoke',
            textAlign: 'left',
            borderWidth: 3,
            padding: 5,
        },
        content: {
            backgroundColor: '#3b3d3b',
            color: 'whitesmoke',
            borderColor: 'transparent',
            borderRadius: 5,
            borderWidth: 3,
            padding: 5,
        }
    }
}
