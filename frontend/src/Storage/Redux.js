import { createSlice } from '@reduxjs/toolkit';

// const navTabs = ['HomePage', 'Login', 'Example']
const tabStorage = createSlice({
    name: 'Tabs',
    initialState: 'Login',

    reducers: {
        selectTab(state, action) {
            return state = action.payload
        }
    }
})

export const { selectTab } = tabStorage.actions
export {
    tabStorage,
}