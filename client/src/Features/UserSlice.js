import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
      const msg = response.data.msg
      console.log(msg)
      return { msg }
    }
    catch (err) { }
  })
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => { 
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        phone:userData.phone,
        address:userData.address,
        password: userData.password,
        role:"user"
        
      })
      const user = response.data.user;
      const msg = response.data.msg;
      console.log(msg);
      return {user,msg}

    }
    catch (error) { 
      const msg = error.message;
      return { msg }
    }

  } 
)
export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      //const msg = 'Invalid credentials';
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);

export const getDrivers = createAsyncThunk(
  "users/getDrivers",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/drivers?city=${city}`);
      const drivers = response.data.drivers; // Array of drivers
      const msg = response.data.msg; // Message, if any
      return { drivers, msg };
    } catch (error) {
      const msg = error.response?.data?.msg || "An error occurred while fetching drivers.";
      return rejectWithValue({ msg });
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/updateUser/${userId}`, userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`); // Adjust API if needed
      return response.data.users; // Ensure response contains an array of users
    } catch (error) {
      const msg = error.response?.data?.msg || 'Failed to fetch users.';
      return rejectWithValue({ msg });
    }
  }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`); // Adjust API endpoint as needed
    return userId; // Return deleted user ID to update the state
  } catch (error) {
    const msg = error.response?.data?.msg || 'Failed to delete user.';
    return rejectWithValue({ msg });
  }
});


const initialState = {
  user: null,
  users: [], // Add this for the list of all users
  msg: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLogin: false,
  drivers: [],
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: 
    (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isSuccess = true;
          state.user = action.payload.user;
          state.msg = action.payload.msg;

        })
        .addCase(registerUser.rejected, (state) => {
          state.isError = true;
          state.msg = "Unexpected error is occured";
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLogin = true;
          state.user = action.payload.user;
          state.msg = action.payload.msg;
        })
        .addCase(login.rejected, (state,action) => {
           state.isError = true;
           state.isLogin = false;
           state.user = null;
           state.msg = action.payload.msg;
        })
        .addCase(logout.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.isLogin = false;
          state.user = null;
          state.msg = action.payload.msg;          
        })
        .addCase(logout.rejected, (state) => {
           state.isError = true
        })
        .addCase(getDrivers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getDrivers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.drivers = action.payload.drivers;
          state.msg = action.payload.msg;
        })
        .addCase(getDrivers.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.msg = action.payload.msg;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.user = action.payload; // Update the user data
          state.msg = "User updated successfully";
        })
        .addCase(fetchUsers.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.users = action.payload || []; // Ensure it's an array
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.msg = action.payload?.msg || 'An error occurred.';
        })

        .addCase(deleteUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // Remove the deleted user from the list
          state.users = state.users.filter((user) => user._id !== action.payload);
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.msg = action.payload?.msg || 'An error occurred while deleting.';
        });
        


    }
  
  

}) 
export default userSlice.reducer;