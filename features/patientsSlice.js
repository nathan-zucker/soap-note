import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

export const defaultTimer = {
    type: 30,
    active: false,
    factor: 2,
    icon: 'play-circle-outline'
}

export class VitalSnap {
    constructor(loc, hr, rr, skin){
        let time = new Date().getTime()
        return (
            {
                factor: 2,
                time: time,
                LOC: loc,
                HR: hr,
                HRQ: '',
                RR: rr,
                RRQ: '',
                skin: skin
            }
        )
    }
}

export class Patient {
    constructor(id, name, age, sex) {
        return {
            name: name,
            id: id,
            PMOI: undefined,
            MOI: '',
            NOI: '',
            subjective: {
                patientName: name || '',
                age: age || '',
                sex: sex || 'none',
                CC: '',
                impression: '',
            },
            vitals: [],
            history: {
                symptoms: '',
                allergies: '',
                medications: '',
                PPMH: '',
                lastOral: '',
                events: '',
            },
            exam: {
                photos: '',
                description: '',
            },
            assessment: '',
            plan: {
                narrative: '',
                actionItems: [],
            },
            timer: defaultTimer,
        }
    }
}

const johnDoe = () => {
    let JD = Object.assign({}, new Patient('JDid', 'John Doe', '35', 'M'), 
    {
        vitals: [
            {
                time: 1685669772366,
                LOC: 'AxO2',
                HR: '105',
                RR: '25',
                skin: 'PCC',
            },
            {
                time: 1685670072366,
                LOC: 'AxO2',
                HR: '102',
                RR: '24',
                skin: 'PCC',
            },
            {
                time: 1685670372366,
                LOC: 'AxO3',
                HR: '90',
                RR: '22',
                skin: 'PCC',
            },
            {
                time: 1685670672366,
                LOC: 'AxO3',
                HR: '95',
                RR: '20',
                skin: 'norm',
            },
            {
                time: 1685670972366,
                LOC: 'AxO3',
                HR: '100',
                RR: '20',
                skin: 'norm',
            },
        ],
        plan: {
            narrative: 'Drink more water stop eating mcdonalds.',
            actionItems: ['Drink more water stop eating mcdonalds.',],
        }
    })
    return JD
}

export const patientsSlice = createSlice({
    name: 'Patients',
    initialState: [
        johnDoe(),
    ],
    reducers: {
        addPatient: (state, action) => {
            console.log('adding patient...', action.payload.patientName)
            
            let newPatient = Object.assign({}, new Patient(), action.payload, {
                subjective: action.payload,
                name: action.payload.patientName,
            })
            
            //CHECK FOR EXISTING PATIENT IN DATABASE
            let existingPatient = state.find(patient => patient.name === action.payload.patientName)
            if (existingPatient !== undefined) {
                console.log(`updating ${existingPatient.name}...`)
                let index = state.indexOf(existingPatient)
                let updatedPatient = Object.assign({}, existingPatient, {
                    subjective: Object.assign({}, existingPatient['subjective'], action.payload)
                })
                return [...(state.slice(0, index)), updatedPatient, ...(state.slice(index+1))]
            }

            // JOHN / JANE DOE
            if (action.payload.patientName === '') {
                let numberOfJohns = 0;
                let numberOfJanes = 0;
                for (let i=0; i<state.length; i++) {
                    if (state[i].name.match(/(John Doe)/)) {
                        numberOfJohns++
                    }
                    if (state[i].name.match(/(Jane Doe)/)) {
                        numberOfJanes++
                    }
                }
                switch (action.payload.sex) {
                    case 'F': 
                        newPatient = Object.assign({}, newPatient, {
                            name: `Jane Doe ${numberOfJanes + 1}`,
                            subjective: Object.assign({}, newPatient.subjective, {
                                patientName: `Jane Doe ${numberOfJanes + 1}`,
                            }),
                        });
                        return [...state, newPatient]   
                    case '':
                    case 'M':
                    case 'U':
                        newPatient = Object.assign({}, newPatient, {
                            name: `John Doe ${numberOfJohns + 1}`,
                            subjective: Object.assign({}, newPatient.subjective, {
                                patientName: `John Doe ${numberOfJohns + 1}`,
                            }),
                        });
                        return [...state, newPatient]
                    default: return [...state, newPatient]
                }
            }
            // ELSE ADD NEW PATIENT TO THE LIST
            //console.log([...state, newPatient])
            return [...state, newPatient]
        },
        updatePatient: (state, action) => {
            const { name, type, data } = action.payload

            let patient = state.find(patient => patient.name === name)
            if (patient === undefined) {
                console.log('could not find patient')
                return;
            }
            let index = state.indexOf(patient)

            switch(type) {
                case 'vitals':
                    if (data.RR === '' || data.HR === '') { return }
                    console.log(`update vitals for ${name}`)
                    
                    let newVitals = Object.assign({}, data, {
                        RR: data.RR * data.factor,
                        HR: data.HR * data.factor
                    })
                    delete(newVitals.factor)

                    let updatedPatient = Object.assign({}, patient, {
                        vitals: [...patient.vitals, newVitals],
                    })
                    console.log('updated vitals: ', ...updatedPatient.vitals)
                    
                    return [...state.slice(0, index), updatedPatient, ...state.slice(index + 1)];
                case 'history':
                case 'exam':
                case 'assessment':
                case 'plan':
                    console.log(`updating ${type} for ${name}...`)
                    return [...state.slice(0, index), Object.assign({}, patient, { [type]: data }), ...state.slice(index + 1)];
                default: console.log("failed to catch")
            }

// WORK IN PROGRESS
            return state;
        },
        storeVitalSnap: (state, action) => {
            
        }
    }
})

export const {addPatient, updatePatient, storeVitalSnap} = patientsSlice.actions
export default patientsSlice.reducer