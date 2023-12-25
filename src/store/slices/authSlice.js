import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, payload) => {
      state.users.push(payload.payload);
    },
  },
});

export const {addUser} = authSlice.actions;

export default authSlice.reducer;
