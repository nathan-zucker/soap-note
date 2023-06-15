import { View, Text, TextInput, Button, Pressable } from "react-native"

export default function VitalsCheckup(props) {
    return (
        <View>
            <Text>Vitals Checkup</Text>
            <Button
                title="done"
            />
            <Button
                title="cancel"
            />
        </View>
    )
}