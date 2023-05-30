import { createSlice } from "@reduxjs/toolkit";

export const soapSlice = createSlice({
    name: 'soap',
    initialState: {
        patientName: 'Nathan',
    },
    reducers: {
        setName: (state, action) => {
            state.patientName = action.payload
        },
    }
})

export const {setName} = soapSlice.actions
export default soapSlice.reducer