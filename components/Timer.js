import { View, Text, Switch, Button, Vibration } from "react-native"
import { useState } from "react"
import { useEffect } from "react"
import { startStopState } from "../features/soapSlice"
import { useDispatch, useSelector } from "react-redux"

import usePalette from "../config/styles"

const Colors = usePalette()

export default function Timer (props) {
    const dispatch = useDispatch()

    const timerType = props.timerType
    const [timerLength, setTimerLength] = useState(30)
    const [timerToggle, toggleTimer] = useState(false)
    const [timeDisplay, setTimeDisplay] = useState(30)
    const timerActive = useSelector(state => state.soap.timer.active)

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
    
    const tick = 100

    useEffect(()=>{
        const interval = setInterval(() => {
            if (!timerActive) {
                setTimeDisplay(timerType)
                return;
            }
            if ( timeDisplay === 0 ) {
                console.log('TIMER END')
                clearInterval(interval)
                endTimer()
                return;
            }
            setTimeDisplay(timeDisplay-1)
        }, tick)

        return () => clearInterval(interval)
    },[timerActive, timeDisplay, setTimeDisplay])

    const endTimer = () => {
        Vibration.vibrate()
        dispatch(startStopState(false))
        setTimeout(()=>{
            setTimeDisplay(timerLength)
        },1000)
    }

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={[Colors.text, {textAlign: 'center', fontSize: 45}]}>{timeDisplay}</Text>
        </View>
    )
}
