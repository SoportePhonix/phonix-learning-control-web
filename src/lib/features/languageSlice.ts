import type { SupportedLanguages } from '@/i18n/translations';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LanguageState {
  current: SupportedLanguages | null;
}

const initialState: LanguageState = {
  current: null,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SupportedLanguages>) => {
      state.current = action.payload;
    },
    clearLanguage: (state) => {
      state.current = null;
    },
  },
});

export const { setLanguage, clearLanguage } = languageSlice.actions;
export default languageSlice.reducer;
