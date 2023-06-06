import { View, Text, Switch, Button, Vibration } from "react-native"
import { useState } from "react"
import { useEffect } from "react"
import { startStopState } from "../features/soapSlice"
import { useDispatch } from "react-redux"

export default function Timer (props) {
    const dispatch = useDispatch()

    const timerType = props.timerType
    const [timerLength, setTimerLength] = useState(30)
    const [timerToggle, toggleTimer] = useState(false)
    const [timeDisplay, setTimeDisplay] = useState(30)
    const [timerActive, setTimerActive] = useState(false)

    const toggleSwitch = () => toggleTimer((prevState) => !prevState)

    useEffect(()=>{
        if (timerType === 30) {
            setTimerLength(30)
            setTimeDisplay(30)
            return;
        }
        else {
            setTimerLength(60)
            setTimeDisplay(60)
            return;
        }
    },[timerType])
    
    useEffect(()=>{
        if (timerActive === true) {
            var display = timeDisplay;

            const interval = setInterval(() => {
                display--;
                if (display < 0) {
                    clearInterval(interval)
                    setTimerActive(false)
                    endTimer()
                }
                else {
                    setTimeDisplay(display)
                }
            }, 100)
        }
    },[timeDisplay, setTimeDisplay, timerActive, setTimerActive, endTimer])

    const startTimer = () => {
        setTimerActive(true)
    }

    const endTimer = () => {
        Vibration.vibrate()
        setTimeout(()=>{
            setTimeDisplay(timerLength)
        },1000)
    }

    return (
        <View style={{
            alignItems: 'center',
        }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{timeDisplay}</Text>
            <Button
                title='start'
                onPress={()=>{
                    startTimer()
                    dispatch(startStopState(true))
                }}
                disabled={timerActive}
            />
        </View>
    )
}