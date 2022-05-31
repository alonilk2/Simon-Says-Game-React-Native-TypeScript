import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface modalState {
  showModal: boolean;
}

const initialState: modalState = {
    showModal: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.showModal = false
    },
    showModal: (state) => {
      state.showModal = true;
    },

  },
});

// Action creators are generated for each case reducer function
export const {hideModal, showModal} = modalSlice.actions;

export default modalSlice.reducer;
