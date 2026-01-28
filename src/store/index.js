import { configureStore, createSlice } from '@reduxjs/toolkit'

// UI slice: theme (light/dark) and any global UI state
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light', // 'light' | 'dark'
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? 'dark' : 'light'
    },
  },
})

export const { toggleTheme, setTheme } = uiSlice.actions

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
})

