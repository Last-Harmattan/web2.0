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
export const initPosts = createAsyncThunk('posts/initPosts', () => {
  return db.getAllPosts();
});

/**
 * Adds a post to the browser db and on success to the state.
 */
export const addPost = createAsyncThunk('posts/addPost', async (post: Post) => {
  const result = await db.saveNewPost(post);
  const postId = result[0].id;
  if (!postId) {
    throw result[0] as PouchDB.Core.Error;
  }

  return db.getPostById(postId);
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

    // If saving a new post into the browser db was successful, add it to the state.
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      state.posts.push(payload);
    });

    // If saving a new post failes, toast the error.
    builder.addCase(addPost.rejected, (state, { error }) => {
      toast.error('Failed to save new post');
      console.error(error);
    });
  },
});

export const postsReducer = postsSlice.reducer;
