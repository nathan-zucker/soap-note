import { createSlice } from "@reduxjs/toolkit";

export class VitalSnap {
    constructor(loc, hr, rr, skin){
        let time = new Date().getTime()
        return (
            {
                time: time,
                LOC: loc,
                HR: hr,
                RR: rr,
                skin: skin
            }
        )
    }
}

export class Patient {
    constructor(name, age, sex) {
        return {
            name: name,
            subjective: {
                patientName: name || '',
                age: age || '',
                sex: sex || '',
                CC: 'unknown'
            },
            objective: {
                vitals: [],
                allergies: '',
                medication: '',
                PPMH: '',
            },
            exam: {
                image: '',
                description: '',
            },
            assessment: '',
            plan: '',
        }
    }
}

const johnDoe = () => {
    let JD = Object.assign({}, new Patient('John Doe', '35', 'M'), {
        objective: {
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
            allergies: '',
            medication: '',
            PPMH: '',
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
            return [...state, Object.assign({}, new Patient(), {
                subjective: action.payload,
                name: action.payload.patientName,
            } )]
        },
        updatePatient: (state, action) => {
            console.log("updating patient... data --->", action.payload)
            return state;
        }
    }
})

export const {addPatient, updatePatient} = patientsSlice.actions
export default patientsSlice.reducer