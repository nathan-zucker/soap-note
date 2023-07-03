import { darkMode } from "./colorPalette"

export const container = {
    backgroundColor: darkMode.background,
    color: 'whitesmoke',
    width: '100%',
    height: '100%',
}

export default function Palette() {



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
        button: {
            backgroundColor: '#3b3d3b',    
            textAlign: 'center',
            justifyContent: 'center',
        }
    }
}