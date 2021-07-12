import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getFriendRequest, GetFriendRequestResult, UserId } from '../api/backend';
import { Friend } from '../database/types/public/Friend';
import { UserDatabase } from '../database/UserDatabase';
import { RootState } from './reducers';
import * as backendApi from '../api/backend';

export interface State {
  /**
   * The value indicating whether the friends state is initialized or pending.
   */
  initialized: boolean;

  /**
   * Contains all friends of the current user.
   */
  friends: Friend[];

  friendRequestPollHandle?: any;

  friendRequests: GetFriendRequestResult[];
}

const db = new UserDatabase();

/**
 * Initializes the friends state by loading all friends from the browser db.
 */
export const initFriends = createAsyncThunk('friends/initFriends', async (_: void, thunkApi) => {
  const friends = await db.getAllFriends();

  // Start interval to periodically request new friend requests.
  const pollIntervalHandle = setInterval(async () => {
    const currentUserId = (thunkApi.getState() as RootState).user.currentUser?._id;
    // Can only poll for friend requests if we have an id.
    if (!currentUserId) {
      return;
    }

    try {
      const friendRequests = await getFriendRequest(currentUserId);
      thunkApi.dispatch(updateFriendRequests(friendRequests));
    } catch (ex) {
      toast.error('Failed to fetch friend requests: ' + JSON.stringify(ex));
    }
  }, 5000);

  return { friends, pollIntervalHandle };
});

/**
 * Accepts the given friend request.
 */
export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptFriendRequest',
  async (friendRequest: GetFriendRequestResult, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const currentUserId = state.user.currentUser!._id;
    await backendApi.acceptFriendRequest(currentUserId, friendRequest.from);
    return friendRequest;
  }
);

const initialState: State = {
  initialized: false,
  friends: [],
  friendRequestPollHandle: undefined,
  friendRequests: [],
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    updateFriendRequests(state, action: PayloadAction<GetFriendRequestResult[]>) {
      for (const req of action.payload) {
        if (!state.friendRequests.find(r => r.from === req.from)) {
          // We don't have that request, so add it to state.
          state.friendRequests.push(req);
        }
      }
    },
  },
  extraReducers: builder => {
    // Reset the state everytime initFriends is called.
    builder.addCase(initFriends.pending, () => {
      return { ...initialState };
    });

    // Put the loaded friends into the state after initFriends is done.
    builder.addCase(initFriends.fulfilled, (state, { payload }) => {
      state.initialized = true;
      state.friends = payload.friends || [];
      state.friendRequestPollHandle = payload.pollIntervalHandle;
    });

    // Issue an error toast if initFriends fails.
    builder.addCase(initFriends.rejected, (state, { error }) => {
      toast.error('Failed to initialize friends state: ' + JSON.stringify(error));
    });

    builder.addCase(acceptFriendRequest.fulfilled, (state, { payload }) => {
      const friend: Friend = { _id: payload.from, userName: payload.userName, lastOnline: '' };
      state.friends.push(friend);
      state.friendRequests.splice(
        state.friendRequests.findIndex(req => req.from === friend._id),
        1
      );
      db.addFriend(friend).catch(err => console.error(err));
    });

    builder.addCase(acceptFriendRequest.rejected, (state, { error }) => {
      toast.error('Failed to accept friend request: ' + JSON.stringify(error));
    });
  },
});

// This action is only for internal use.
const { updateFriendRequests } = friendsSlice.actions;

export const friendsReducer = friendsSlice.reducer;
