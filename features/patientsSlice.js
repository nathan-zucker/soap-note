import { createSlice } from "@reduxjs/toolkit";

class Patient {
    constructor(name, age, sex) {
        return {
            name: name,
            subjective: {
                patientName: name,
                age: age,
                sex: sex,
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
                    HR: '85',
                    RR: '25',
                    skin: 'PCC',
                },
                {
                    time: 1685670072366,
                    HR: '80',
                    RR: '24',
                    skin: 'PCC',
                },
                {
                    time: 1685670372366,
                    HR: '80',
                    RR: '22',
                    skin: 'PCC',
                },
                {
                    time: 1685670672366,
                    HR: '90',
                    RR: '25',
                    skin: 'norm',
                },
                {
                    time: 1685670972366,
                    HR: '80',
                    RR: '24',
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
            let [name, age, sex] = action.payload
            return [...state, new Patient(name, age, sex)]
        }
    }
})

export const {addPatient} = patientsSlice.actions
export default patientsSlice.reducer