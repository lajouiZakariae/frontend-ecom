// src/store/siteSettingsSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Function to load state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('siteSettings')
        if (serializedState === null) {
            return {
                isSidebarOpen: window.innerWidth > 768, // Open by default on desktop
            }
        }
        return JSON.parse(serializedState)
    } catch (err) {
        console.error('Could not load state', err)
        return {
            isSidebarOpen: window.innerWidth > 768,
        }
    }
}

// Initial state
const initialState: { isSidebarOpen: boolean } = loadState()

const siteSettingsSlice = createSlice({
    name: 'siteSettings',
    initialState,
    reducers: {
        toggleSidebar: state => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload
        },
    },
})

export const { toggleSidebar, setSidebarOpen } = siteSettingsSlice.actions

export default siteSettingsSlice.reducer
