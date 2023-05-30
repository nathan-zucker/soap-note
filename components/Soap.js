import {
    View,
    Pressable,
    Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


export default function Soap() {
    const soap = useSelector(state=>state.soap)
    return(
        <View>
            <Text>I am the SOAP note</Text>
        </View>
    )
}