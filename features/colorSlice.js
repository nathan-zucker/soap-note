import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
    name: 'color',
    initialState: 'dark',
    reducers: {
        changeColor: (state, action) => {
            return action.payload;
        }
    }
})

export const {changeColor} = colorSlice.actions
export default colorSlice.reducer