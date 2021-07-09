import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CommentDBWrapper } from '../database/PostCommentDatabase';
import { Post } from '../database/types/public/Post';

export interface State {
  /**
   * The value indicating whether the posts state is initialized or pending.
   */
  initialized: boolean;

  /**
   * Contains the post of this user as well as from all friends.
   */
  posts: Post[];
}

const db = new CommentDBWrapper();

/**
 * Initializes the posts state by loading all existing posts from the browser db.
 */
export const initPosts = createAsyncThunk('posts/initPosts', async () => {
  return db.getAllPosts();
});

const initialState: State = {
  initialized: false,
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Reset the state everytime initPosts is called.
    builder.addCase(initPosts.pending, () => {
      return { ...initialState };
    });

    // Put the loaded posts into the state after initPosts is done.
    builder.addCase(initPosts.fulfilled, (state, { payload }) => {
      state.initialized = true;
      state.posts = payload;
    });

    // Issue an error toast if initPosts fails.
    builder.addCase(initPosts.rejected, (state, { error }) => {
      toast.error('Failed to initialize posts state: ' + error.toString());
    });
  },
});

export const postsReducer = postsSlice.reducer;
