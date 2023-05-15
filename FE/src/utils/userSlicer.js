import {createSlice} from '@reduxjs/toolkit';

const initialStates = {
  isLogin: false,
  id: '',
  name: '',
  email: '',
  address: '',
  location: '',
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
    setAddress: (state, action) => {
      if (action.payload) {
        state.address = action.payload || '';
      }
    },
    setLocation: (state, action) => {
      if (action.payload) {
        state.location = action.payload || '';
      }
    },
    logOutAccount: state => {
      state.isLogin = false;
    },
  },
});

export const {loginAccount, logOutAccount, saveId, setAddress, setLocation} = userSlicer.actions;

export default userSlicer.reducer;
