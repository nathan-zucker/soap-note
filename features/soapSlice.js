import { createSlice } from "@reduxjs/toolkit";

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
            allergies: [],
            medication: [],
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
            let time = new Date().getTime()
            let snap = Object.assign({}, action.payload, {
                time: time
            })
            let newVitals = [...state.objective.vitals]
            newVitals.push(snap)
            console.log(newVitals, newVitals.length)
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