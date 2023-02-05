import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {records: [], loading: false, error: null, record: null};

// fetch posts thunk
export const fetchPosts = createAsyncThunk('posts/fetchposts', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await fetch ('http://localhost:5005/posts');
        const data = await response.json();
        return data
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

// fetch post thunk
export const fetchPost = createAsyncThunk('posts/fetchpost', async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await fetch(`http://localhost:5005/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

// delete post thunk
export const deletePost = createAsyncThunk('posts/deletepost', async(id, thunkAPI) => {
    console.log(id);
    const {rejectWithValue} = thunkAPI;
    try {
        await fetch(`http://localhost:5005/posts/${id}`, 
        {method: 'DELETE'});
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}) 

// add post thunk
export const addPost = createAsyncThunk('posts/addPost', async (item, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {auth} = getState();
    item.userId = auth.id;
    console.log(item);
    try {
        const post = await fetch('http://localhost:5005/posts', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const data = await post.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// edit post
export const editPost = createAsyncThunk('posts/editPost', async (item, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const response = await fetch(`http://localhost:5005/posts/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearRecord: (state) => {
            state.record = null;
        }
    },
    extraReducers: (builder) => {
        // fetch posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
            // state.records.push(...action.payload)
            // console.log(action.payload);
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log(state.error)
        });

        // fetch post
        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = null;
            // state.record = null;
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        });
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log(state.error)
        });

        // delete post
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = null;

        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter(el => el.id !== action.payload)
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // add post
        builder.addCase(addPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.loading = false;
            state.records.push(action.payload)

        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // edit post
        builder.addCase(editPost.pending, (state) => {
            state.loading = true;
            state.error = null;

        });
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            // state.record = action.payload;
        });
        builder.addCase(editPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }

   

   
     /*{
        // this approach will be depricated
        [fetchPosts.pending]: (state, action) => {
            console.log('pending');
            state.loading = true;
        },
        [fetchPosts.fulfilled] : (state, action) => {
            console.log('fulfilled');
            state.loading = false;
            console.log(action.payload);
            state.records = action.payload;
        },
        [fetchPosts.rejected] : (state, action) => {
            console.log('rejected');
            state.loading = false;
        }
    }*/
})

export const {clearRecord} = postSlice.actions;
export default postSlice.reducer;