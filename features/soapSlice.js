import { createSlice } from "@reduxjs/toolkit";

import { VitalSnap } from "./patientsSlice";

import { Patient, defaultTimer } from "./patientsSlice";

export const soapSlice = createSlice({
    name: 'soap',
    initialState: Object.assign({}, new Patient(), {
        timer: defaultTimer
    }),
    
    reducers: {
        storePMOI: (state, action) => {
            console.log('store PMOI ', action.payload)
            return Object.assign({}, state, {
                PMOI: action.payload
            })
        },
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
        storeSceneSizeup: (state, action) => {
            if (action.payload.PMOI) {
                console.log("POSITIVE MOI!")
            }
            return Object.assign({}, state, {
                PMOI: action.payload.PMOI,
                MOI: action.payload.MOI,
                NOI: action.payload.NOI,
            })
        },
        storeSubjective: (state, action) => {
            console.log('NAME: ', action.payload.patientName)
            return Object.assign({}, state, {
                name: action.payload.patientName,
                subjective: Object.assign({}, state.subjective, action.payload),
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
        storeExam: (state, action) => {
            return Object.assign({}, state, {
                exam: Object.assign({}, state.exam, action.payload)
            })
        },
        storeAssessment: (state, action) => {
            console.log('storing assessment', action.payload)
            return Object.assign({}, state, {
                assessment: action.payload ? action.payload : state.assessment,
            })
        },
        storePlan: (state, action) => {
            return Object.assign({}, state, {
                plan: action.payload ? action.payload : state.plan,
            })
        },
        loadPatient: (state, action) => {
            console.log("SOAP RECEIVED:")
            return action.payload;
        },
        newSoap: (state) => {
            return Object.assign({}, new Patient())
        },
        updatePlan: (state, action) => {
            switch (action.payload.type) {
                case 'add-action-item':
                    console.log('ADD ACTION ITEM!', `key: ${action.payload.key}`)
                    return Object.assign({}, state, {
                        plan: Object.assign({}, state.plan, {
                            actionItems: [...state.plan.actionItems, {
                                text: action.payload.text,
                                key: action.payload.key,
                                backgroundColor: 'blue'
                            }]
                        })
                    });
                    case 'update-action-items':
                        console.log('UPDATE ACTION ITEMS...')
                        return Object.assign({}, state, {
                            plan: Object.assign({}, state.plan, {
                                actionItems: action.payload.actionItems
                            })
                        })
                default: return state;
            }
        }
    }
})

export const {
    storePMOI,
    storeSceneSizeup,
    storeSubjective,
    storeVitalsSnapshot,
    changeTimerType, 
    startStopState, 
    storeHistory, 
    storeExam, 
    storeAssessment, 
    storePlan, 
    loadPatient, 
    newSoap,
    updatePlan
} = soapSlice.actions
export default soapSlice.reducer