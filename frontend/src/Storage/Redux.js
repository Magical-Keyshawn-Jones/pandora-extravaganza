import { createSlice } from '@reduxjs/toolkit';

const tabStorage = createSlice({
    name: 'Tabs',
    initialState: 'Login',

    reducers: {
        selectTab(state, action) {
            return state = action.payload
        }
    }
})

const accessToken = createSlice({
    name: 'accessToken',
    initialState: null,

    reducers: {
        login(state, action) {
            return state = action.payload
        },

        logout(state, action){
            return state = null
        },
    }
})

export const { selectTab } = tabStorage.actions
export const { login, logout } = accessToken.actions
export {
    tabStorage,
    accessToken,
    
}