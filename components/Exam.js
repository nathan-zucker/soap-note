import {
    View,
    Pressable,
    Text,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import {storeExam} from '../features/soapSlice';
import { updatePatient } from '../features/patientsSlice';
import { cameraOn, setPreview } from '../features/cameraSlice';
import ExamCamera from './ExamCamera';

import usePalette from '../config/styles';
import { styles } from './SoapNote';

const Colors = usePalette()

export default function Exam({navigation}) {
    const dispatch = useDispatch()
    const name = useSelector(state => state.soap.name)
    const cameraActive = useSelector(state => state.camera.active)
    const photos = useSelector(state => state.camera.photos)
    const [examDescription, setExamDescription] = useState('')

    function Thumbnails ({photos}) {
        const dispatch = useDispatch()
        return photos.map((photo, i) => {
            return (
                <Pressable key={i} style={styles.thumbnail} onPress={()=>{
                    dispatch(setPreview(i))
                    dispatch(cameraOn())
                }}>
                    <Image
                        source={{uri: photo.uri}}
                        height={styles.thumbnail.height}
                        width={styles.thumbnail.height}
                    />
                </Pressable>
            )
        })
    }

    function PhotoGallery () {
        return (
            <View>
                <Text style={[Colors.text, {textAlign: 'center', margin: 10, fontSize: 16, textDecorationLine: 'underline',}]}>Photos:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                    <Thumbnails photos={photos} />
                    <Pressable
                        style={[Colors.button, styles.thumbnail]}
                        onPress={()=>dispatch(cameraOn())}
                    >
                        <Ionicons name='add-circle-outline' style={[Colors.text, {fontSize: 50, marginLeft: 3.5, marginTop: 0,}]} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[Colors.container, {height: '100%'}]}>

                {cameraActive ? <ExamCamera/> : <PhotoGallery/> }
                
                <View>
                    <Text style={[Colors.text, {marginLeft: '10%'}]}>Description:</Text>
                    <TextInput
                        style={[
                            Colors.textInput,
                            {
                                minHeight: 80,
                                width: '90%',
                                marginHorizontal: '5%',
                                padding: 4,
                            }
                        ]}
                        multiline
                        numberOfLines={4}
                        onChangeText={(e)=>{setExamDescription(e)}}
                    />
                </View>

                <Pressable
                    style={[styles.button, {alignSelf: 'center'}]}
                    onPress={()=>{
                        let exam = {
                            photos: [...photos],
                            description: examDescription,
                        }
                        dispatch(storeExam(exam))
                        dispatch(updatePatient({
                            name: name,
                            type: 'exam',
                            data: exam,
                        }))
                        navigation.navigate("Assessment")
                    }}
                >
                    <Text>NEXT</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    )
}