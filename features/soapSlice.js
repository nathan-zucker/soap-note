import { createSlice } from "@reduxjs/toolkit";

import { VitalSnap } from "./patientsSlice";

import { Patient } from "./patientsSlice";



export const soapSlice = createSlice({
    name: 'soap',
    initialState: new Patient(),
    
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
        startStopState: (state, action) => {
            console.log('toggling')
            return Object.assign({}, state, {
                timer: Object.assign({}, state.timer, {
                    active: action.payload,
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
            let newVitals = [...state.objective.vitals]
            let factor = state.timer.factor
            newVitals.push(new VitalSnap(action.payload.LOC, action.payload.HR * factor, action.payload.RR * factor, action.payload.skin))
            //console.log("vitals updated --->", newVitals)
            return Object.assign({}, state, {
                objective: Object.assign({}, state.objective, {
                    vitals: newVitals,
                })
            })
        },
        loadPatient: (state, action) => {
            console.log("SOAP RECEIVED:")
            return action.payload;
        }
    }
})

export const {storeSubjective, storeVitalsSnapshot, changeTimerType, startStopState, loadPatient} = soapSlice.actions
export default soapSlice.reducer