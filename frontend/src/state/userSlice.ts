import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserData } from '../database/types/public/UserData';
import { UserDatabase } from '../database/UserDatabase';
import * as backendApi from '../api/backend';
import { RootState } from './reducers';

export interface State {
  /**
   * The value indicating whether state of the current user is initialized or pending.
   */
  initialized: boolean;

  /**
   * The data of the current user.
   */
  currentUser?: UserData;

  /**
   * The users current peer id.
   */
  currentPeerId?: string;
}

const db = new UserDatabase();

export const initUser = createAsyncThunk('user/initUser', async () => {
  return db.getUserData();
});

export const register = createAsyncThunk(
  'user/register',
  async (args: { userName: string }, thunkApi) => {
    const userId = await backendApi.register({
      userName: args.userName,
      location: (thunkApi.getState() as RootState).user.currentPeerId || '',
    });
    await db.saveNewUserData({
      _id: userId,
      lastOnline: new Date().toISOString(),
      privateKey: '',
      publicKey: '',
      userName: args.userName,
    });
    return db.getUserData();
  }
);

const initialState: State = {
  initialized: false,
  currentUser: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPeerId(state, action: PayloadAction<{ peerId: string }>) {
      state.currentPeerId = action.payload.peerId;
    },
  },
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
      toast.error('Failed to initialize user state: ' + JSON.stringify(error));
    });

    // Set registered user as current user.
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.currentUser = payload!;
    });

    builder.addCase(register.rejected, (state, { error }) => {
      toast.error('Failed to register user: ' + JSON.stringify(error));
    });
  },
});

export const userReducer = userSlice.reducer;
