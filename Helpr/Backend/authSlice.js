import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken: null,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      // Store token in AsyncStorage
      AsyncStorage.setItem('userToken', action.payload);
    },
    clearUserToken: (state) => {
      state.userToken = null;
      // Clear token from AsyncStorage
      AsyncStorage.removeItem('userToken');
    },
  },
});

export const { setUserToken, clearUserToken } = authSlice.actions;
export default authSlice.reducer;
