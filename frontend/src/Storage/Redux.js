import { createSlice } from '@reduxjs/toolkit';

// Storage Placeholder
// This file is not actively used in production

const storagePlaceholder = createSlice({
    name: 'Testing Redux',
    initialState: 'This does nothing useful',

    reducers: {
        changeState(state, action) {
            state = action.payload
            return state
        },

        resetState(state, action) {
            state = 'This does nothing useful'
            return state
        }
    }
})

export const { changeState, resetState} = storagePlaceholder.actions
export {
    storagePlaceholder,
}