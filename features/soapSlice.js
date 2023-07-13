import { createSlice } from "@reduxjs/toolkit";

import { VitalSnap } from "./patientsSlice";

import { Patient, defaultTimer } from "./patientsSlice";

export const soapSlice = createSlice({
    name: 'soap',
    initialState: Object.assign({}, new Patient(), {
        timer: defaultTimer
    }),
    
    reducers: {
        changeTimerType: (state, action) => {
            console.log('changing timer type', action.payload)
            return Object.assign({}, state, {
                timer: Object.assign({}, state.timer, {
                    type: action.payload,
                    factor: Math.floor(60 / action.payload)
                })
            });
        },
        startStopState: (state) => {
            return Object.assign({}, state, {
                timer: Object.assign({}, state.timer, {
                    active: !state.timer.active,
                    icon: !state.timer.active ? 'refresh' : 'play-circle-outline',
                })
            });
        },
        storeSubjective: (state, action) => {
            let sub = Object.assign({}, state.subjective, action.payload)
            return Object.assign({}, state, {
                name: sub.patientName,
                subjective: sub
            })
        },
        storeVitalsSnapshot: (state, action) =>  {
            let newVitals = [...state.vitals]
            let factor = state.timer.factor
            newVitals.push(new VitalSnap(action.payload.LOC, action.payload.HR * factor, action.payload.RR * factor, action.payload.skin))
            //console.log("vitals updated --->", newVitals)
            return Object.assign({}, state, {
                vitals: newVitals
            })
        },
        storeHistory: (state, action) => {
            return Object.assign({}, state, {
                history: action.payload
            })
        },
        loadPatient: (state, action) => {
            console.log("SOAP RECEIVED:")
            return action.payload;
        },
        newSoap: (state) => {
            return Object.assign({}, new Patient())
        }
    }
})

export const {storeSubjective, storeVitalsSnapshot, changeTimerType, startStopState, storeHistory, loadPatient, newSoap} = soapSlice.actions
export default soapSlice.reducer