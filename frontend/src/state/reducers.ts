import { combineReducers } from '@reduxjs/toolkit';
import { friendsReducer } from './friendsSlice';
import { postsReducer } from './postsSlice';
import { userReducer } from './userSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  friends: friendsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
