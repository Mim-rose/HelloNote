import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Safe parsing from localStorage with error handling
let savedPastes = [];

try {
  const data = localStorage.getItem('pastes');
  savedPastes = data ? JSON.parse(data) : [];
} catch (error) {
  console.error('Invalid JSON in localStorage "pastes":', error);
  localStorage.removeItem('pastes'); // Clear corrupted data
}

const initialState = {
  pastes: savedPastes,
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
      toast('Paste added successfully');
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if(index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast('Paste updated successfully');


      }

},
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
      toast('All pastes removed successfully');
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log('Removing paste with ID:', pasteId);
      const index = state.pastes.findIndex((item )=> item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast('Paste removed successfully');

      }
      
      
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;