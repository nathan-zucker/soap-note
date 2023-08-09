import { createSlice } from "@reduxjs/toolkit";

import logo from '../assets/favicon.png'

export const cameraSlice = createSlice({
    name: 'camera',
    initialState: {
        active: false,
        photos: [],
        preview: {
            uri: '',
            description: '',
        },
    },
    reducers: {
        toggleCamera: (state) => {
            return Object.assign({}, state, { active: !state.active })
        },
        cameraOn: (state) => {
            return Object.assign ({}, state, {active: true})
        },
        cameraOff: (state) => {
            return Object.assign ({}, state, {active: false})
        },
        savePhoto: (state, action) => {
            return Object.assign({}, state, {
                photos: [...state.photos, action.payload]
            })
        },
        setPreview: (state, action) => {
            console.log('setting preview: ', action.payload.uri)
            return Object.assign({}, state, {
                preview: action.payload,
            })
        },
    }
})

export const {toggleCamera, cameraOff, cameraOn, savePhoto, setPreview} = cameraSlice.actions
export default cameraSlice.reducer