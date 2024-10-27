import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (_, { payload }) => payload,
        clearUser: () => null,
    },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
