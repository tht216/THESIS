import {createSlice} from '@reduxjs/toolkit';

const initialStates = {
  isLogin: false,
  id: '',
  isCompany: false,
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
      if (action.payload === "company") {
        state.isCompany = true;
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
