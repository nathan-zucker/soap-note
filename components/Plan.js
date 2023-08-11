import {
    View,
    Pressable,
    Text,
    TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { updatePlan } from '../features/soapSlice';
import { updatePatient } from '../features/patientsSlice';

import usePalette from '../config/styles';
import { styles } from '../config/stylesheet';

const Colors = usePalette();

function getBlockColor(length, index) {
    const colorFactor = Math.floor(255 / length);
    return `rgb(${ 255 - ( colorFactor * index ) },${ 128 - ( colorFactor * index ) },${ colorFactor * index })`
}

function ActionItem({item, drag, isActive}) {
    const actionItemList = useSelector(state => state.soap.plan.actionItems)
    let index = actionItemList.indexOf(actionItemList.find(d => d.text === item.text))
    if (index === -1) { return console.log('error could not find action item index') }

    return (
        <ScaleDecorator>
            <TouchableOpacity
                activeOpacity={1}
                onLongPress={drag}
                disabled={isActive}
                style={{
                    backgroundColor: isActive ? "red" : getBlockColor(actionItemList.length, index),
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                }}
            >
                <Text style={Colors.text}>{item.text}</Text>
            </TouchableOpacity>
        </ScaleDecorator>
    )
}

export default function Plan({navigation}) {
    const dispatch = useDispatch()
    const name = useSelector(state => state.soap.name)
    const [plan, setPlan] = useState('')
    const actionItems = useSelector(state => state.soap.plan.actionItems)
    const soap = useSelector(state => state.soap)

    function AddActionItem({items}) {
        const dispatch = useDispatch()
        const [newActionItem, setNewActionItem] = useState()
        const [newText, setNewText] = useState('')

        const key = items.length + 1;

        return (
            <View style={[Colors.container, {height: 80, width: '90%', marginHorizontal: '5%', marginVertical: '2%'}]}>
                <Text style={Colors.header}>Add an Action Item</Text>
                <TextInput
                    value={newText}
                    onChangeText={(e)=>setNewText(e)}
                    multiline
                    style={[Colors.textInput, {height: 50}]}
                />
                <Pressable onPress={()=>{
                    if (newText === '') {return}
                    console.log('add action item')
                    dispatch(updatePlan({
                        type: 'add-action-item',
                        text: newText,
                        key: key || 0,
                    }))
                }}>
                    <Ionicons name='checkmark-circle-outline' style={Colors.icon} />
                </Pressable>
            </View>
            )
        }

    return (
        <View style={Colors.container}>
            
            <View style={[Colors.container, {height: '30%'}]}>
                <Pressable
                    style={[styles.button, {alignSelf: 'center', marginTop: 5}]}
                    onPress={()=>{
                        dispatch(updatePatient({
                            type: 'plan',
                            name: name,
                            data: soap.plan,
                        }))
                        navigation.navigate('Vitals')
                    }}
                >
                    <Text>FINISH</Text>
                </Pressable>

                <AddActionItem items={actionItems} />

            </View>

            <DraggableFlatList
                data={actionItems}
                onDragEnd={({data}) => {
                    dispatch(updatePlan({
                        type: 'update-action-items',
                        actionItems: data,
                    }))
                }}
                onRelease={()=>{console.log('released')}}
                keyExtractor={(item) => item.key}
                renderItem={ActionItem}
                style={{height: '70%'}}
            />
        </View>
    )
}