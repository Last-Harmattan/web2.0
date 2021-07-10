import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserData } from '../database/types/public/UserData';
import { UserDatabase } from '../database/UserDatabase';

export interface State {
  /**
   * The value indicating whether state of the current user is initialized or pending.
   */
  initialized: boolean;

  /**
   * The data of the current user.
   */
  currentUser?: UserData;
}

const db = new UserDatabase();

export const initUser = createAsyncThunk('user/initUser', async () => {
  return db.getUserData();
});

const initialState: State = {
  initialized: false,
  currentUser: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Reset the state everytime initUser is called.
    builder.addCase(initUser.pending, () => {
      return { ...initialState };
    });

    // Add the current user data to the state after initUser is done.
    builder.addCase(initUser.fulfilled, (state, { payload }) => {
      state.initialized = true;
      state.currentUser = !!payload ? payload : undefined;
    });

    // Issue an error toast if initUser fails.
    builder.addCase(initUser.rejected, (state, { error }) => {
      toast.error('Failed to initialize user state: ' + error.toString());
    });
  },
});

export const userReducer = userSlice.reducer;
