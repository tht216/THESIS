import {createSlice} from '@reduxjs/toolkit';

const initialStates = {
  isLogin: false,
  id: '',
  name: '',
  email: '',
};

export const userSlicer = createSlice({
  name: 'userSlice',
  initialState: initialStates,
  reducers: {
    loginAccount: (state, action) => {
      state.isLogin = true;
      if (action.payload) {
        state.name = action.payload || '';
      }
    },
    saveId: (state, action) => {
      if (action.payload) {
        state.id = action.payload || '';
      }
    },
    logOutAccount: state => {
      state.isLogin = false;
    },
  },
});

export const {loginAccount, logOutAccount, saveId} = userSlicer.actions;

export default userSlicer.reducer;
