import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface sequenceState {
  currentColor: number;
}

const initialState: sequenceState = {
  currentColor: -1,
};

export const simonSlice = createSlice({
  name: 'simon',
  initialState,
  reducers: {
    triggerColor: (state, action: PayloadAction<number>) => {
      state.currentColor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {triggerColor} = simonSlice.actions;

export default simonSlice.reducer;
