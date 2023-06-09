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
            width: '100%',
            height: '100%',
        },
        text: {
            color: 'whitesmoke'
        },
        textAlt: {
            color: '#1a1a1a'
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
        }
    }
}