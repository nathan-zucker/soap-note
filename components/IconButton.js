import { View, Pressable, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import usePalette from "../config/styles";

const Colors = usePalette()

export function IconButton({icon, text}) {
    
    //console.log([...text].length)
    
    return (
        <Pressable style={{
            backgroundColor: 'gray',
            width: 50,
            height: 50,
        }}>
            <Ionicons style={Colors.icon} name={icon} />
        </Pressable>
    )
} 