import { createSlice } from "@reduxjs/toolkit";

import { VitalSnap } from "./patientsSlice";


export const soapSlice = createSlice({
    name: 'soap',
    initialState: {
        subjective: {
            patientName: '',
            age: 0,
            sex: '',
            CC: '',
        },
        objective: {
            vitals: [],
            allergies: '',
            medication: '',
            PPMH: '',

        }
    },
    reducers: {
        storeSubjective: (state, action) => {
            console.log('storing')
            let sub = Object.assign({}, state.subjective, action.payload)
            return Object.assign({},state,{
                subjective: sub
            })
        },
        storeVitalsSnapshot: (state, action) => {
            let newVitals = [...state.objective.vitals]
            newVitals.push(new VitalSnap(action.payload.LOC, action.payload.HR, action.payload.RR, action.payload.skin))
            console.log("vitals updated --->", newVitals)
            return Object.assign({}, state, {
                objective: Object.assign({}, state.objective, {
                    vitals: newVitals,
                })
            })
        }
    }
})

export const {storeSubjective, storeVitalsSnapshot} = soapSlice.actions
export default soapSlice.reducer