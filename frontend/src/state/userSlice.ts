import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserData } from '../database/types/public/UserData';
import { UserDatabase } from '../database/UserDatabase';
import * as backendApi from '../api/backend';
import { RootState } from './reducers';
import * as PostService from '../peerJS/PostService';
import { updateLastSeen } from './friendsSlice';
import { addPost } from './postsSlice';
import { CommentDBWrapper } from '../database/PostCommentDatabase';

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
const postDb = new CommentDBWrapper();

export const initUser = createAsyncThunk('user/initUser', async (_: void, thunkApi) => {
  const userData = await db.getUserData();
  thunkApi.dispatch(setUserData(userData));
  if (userData) {
    await thunkApi.dispatch(login());
  }
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
    const userData = await db.getUserData();
    thunkApi.dispatch(setUserData(userData));
    await thunkApi.dispatch(login());
  }
);

// This thunk is to be dispatched after init if there is already user data stored in the db or after
// registration.
// Initialized the peerjs connection and post polling.
export const login = createAsyncThunk('user/login', async (_: void, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const peerId = await PostService.openPeer();
  console.warn('currentUser should be defined', state.user.currentUser);
  await backendApi.updateUserLocation(state.user.currentUser!._id, peerId);

  PostService.addEventHandler(async (requesterUserId, foreignPeerId, latestIsoTime) => {
    try {
      // TODO: Check signature.
      // Check whether peer is our friend.
      const friend = await db.getFriend(requesterUserId);
      if (!friend) {
        console.warn('Not friend', requesterUserId, 'requested posts.');
        throw new Error('not a friend');
      }

      const state = thunkApi.getState() as RootState;
      const thisUserId = state.user.currentUser!._id;
      const posts = await postDb.getPostsAfterTimeFromUser(latestIsoTime, thisUserId);
      return posts;
    } catch (ex) {
      console.error('Post poll handler failed', ex);
      return [];
    }
  });

  // Start polling our friends for new posts.
  const pollHandle = setInterval(async () => {
    const state = thunkApi.getState() as RootState;
    const myUserId = state.user.currentUser!._id;
    const friends = state.friends.friends;

    for (const friend of friends) {
      // If the peerjs connection fails it somehow is a uncatched exception and leads to the
      // termination of this interval loop. This problem can be avoided when we just start
      // all poll requests in concurrently.
      (async () => {
        try {
          const position = await backendApi.getUserLocation(friend._id);
          if (!position || position === '') {
            return;
          }

          // Request new posts from our friend.
          // If she is reachable, update the last seen.
          // If she has even some new posts, add them.
          const result = await PostService.sendGetNewPostsRequest(
            myUserId,
            position,
            friend.lastOnline
          );
          if (!result.connectionSuccess) {
            console.log('No connection to', friend);
            return;
          }

          await thunkApi.dispatch(updateLastSeen({ id: friend._id, lastSeen: result.time }));
          for (const post of result.posts) {
            await thunkApi.dispatch(addPost(post));
          }
        } catch (ex) {
          console.error('Failed to fetch posts', ex);
        }
      })();
    }
  }, 5000);
});

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
    setUserData(state, action: PayloadAction<UserData | null>) {
      state.currentUser = !!action.payload ? action.payload : undefined;
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
    });

    // Issue an error toast if initUser fails.
    builder.addCase(initUser.rejected, (state, { error }) => {
      toast.error('Failed to initialize user state: ' + JSON.stringify(error));
    });

    builder.addCase(register.rejected, (state, { error }) => {
      toast.error('Failed to register user: ' + JSON.stringify(error));
    });

    builder.addCase(login.rejected, (state, { error }) => {
      toast.error('Failed to login aka connect to peerjs: ' + JSON.stringify(error));
    });
  },
});

const { setUserData } = userSlice.actions;
export const { setCurrentPeerId } = userSlice.actions;
export const userReducer = userSlice.reducer;
