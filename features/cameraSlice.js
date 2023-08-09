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
            let index = state.photos.indexOf(state.photos.find(photo => photo.uri === action.payload.uri))
            if (index > -1) {
                return Object.assign({}, state, {
                    photos: [...state.photos.slice(0, index), action.payload, ...state.photos.slice(index + 1)]
                })
            }
            else {
                return Object.assign({}, state, {
                    photos: [...state.photos, action.payload]
                })
            }
        },
        setPreview: (state, action) => {
            console.log('setting preview: ', action.payload)
            return Object.assign({}, state, {
                preview: Object.assign({}, state.photos[action.payload]),
            })
        },
        deletePhoto: (state, action) => {
            let index = state.photos.indexOf([...state.photos].find(photo => photo.uri === action.payload))
            if (index > -1) {
                console.log('deleting photo', action.payload, index)
                return Object.assign({}, state, {
                    photos: [...state.photos.slice(0, index), ...state.photos.slice(index + 1)]
                })
            }
            else return state;
        },
    }
})

export const {toggleCamera, cameraOff, cameraOn, savePhoto, setPreview, deletePhoto} = cameraSlice.actions
export default cameraSlice.reducer