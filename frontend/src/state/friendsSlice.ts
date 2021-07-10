import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Friend } from '../database/types/public/Friend';
import { UserDatabase } from '../database/UserDatabase';

export interface State {
  /**
   * The value indicating whether the friends state is initialized or pending.
   */
  initialized: boolean;

  /**
   * Contains all friends of the current user.
   */
  friends: Friend[];
}

const db = new UserDatabase();

/**
 * Initializes the friends state by loading all friends from the browser db.
 */
export const initFriends = createAsyncThunk('posts/initFriends', async () => {
  return db.getAllFriends();
});

const initialState: State = {
  initialized: false,
  friends: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Reset the state everytime initFriends is called.
    builder.addCase(initFriends.pending, () => {
      return { ...initialState };
    });

    // Put the loaded friends into the state after initFriends is done.
    builder.addCase(initFriends.fulfilled, (state, { payload }) => {
      state.initialized = true;
      state.friends = payload || [];
    });

    // Issue an error toast if initFriends fails.
    builder.addCase(initFriends.rejected, (state, { error }) => {
      toast.error('Failed to initialize friends state: ' + error.toString());
    });
  },
});

export const friendsReducer = friendsSlice.reducer;
