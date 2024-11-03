import { configureStore } from '@reduxjs/toolkit'
import siteSettingsReducer from './site-settings'
import { userSlice } from '@/features/auth/store'

const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state.siteSettings)
        localStorage.setItem('siteSettings', serializedState)
    } catch (err) {
        console.error('Could not save state', err)
    }
}

const store = configureStore({
    reducer: {
        siteSettings: siteSettingsReducer,
        user: userSlice.reducer,
    },
})

// Subscribe to store updates
store.subscribe(() => {
    saveState(store.getState())
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
