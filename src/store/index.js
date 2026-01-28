import { configureStore, createSlice } from '@reduxjs/toolkit'

const THEME_STORAGE_KEY = 'ebirth_theme'

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return saved === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

// UI slice: theme (light/dark) and any global UI state
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: getInitialTheme(), // 'light' | 'dark'
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
export { THEME_STORAGE_KEY }

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
})

