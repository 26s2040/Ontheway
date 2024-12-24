import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 


export const savePost = createAsyncThunk("posts/savePost",async(postData)=>{
    try{
    const response = await axios.post("http://localhost:3001/savePost",{
        postMsg: postData.postMsg,
        email: postData.email,
    });
    const post = response.data.post;
    const msg = response.data.msg
    return ({post,msg})

  } catch (error) {
    console.log(error);
  }
});


const initialState = {
    posts: [],
    comments: [],
    likes: [],
    status: "idle"

  };
  

const postSlice = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(savePost.pending, (state) => {
          state.status = "loading";
        })
        .addCase(savePost.fulfilled, (state, action) => {
          console.log(action.payload);
          state.status = "succeeded";
          // Update the state with fetched posts adding the latest post in the beginning
          state.posts.unshift(action.payload);
        })
        .addCase(savePost.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });
  export default postSlice.reducer;

      
    
 
