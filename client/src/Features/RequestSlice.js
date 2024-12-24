import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for sending a request
export const createRequest = createAsyncThunk(
  'requests/createRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/request`, requestData);
      return response.data.request; // return the created request from the backend
    } catch (error) {
      return rejectWithValue(error.response.data); // return error message if failed
    }
  }
);

export const getDriverRequests = createAsyncThunk(
  'requests/getDriverRequests',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests/driver/${driverId}`);
      return response.data.requests; // Assuming this is an array
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Error fetching requests.");
    }
  }
);


// Create the request slice
const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [], // Store a list of requests
    status: null,  // status of the request (pending, success, failed)
    error: null,
    msg: ' '   // error message if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests.push(action.payload); // Add the new request to the list
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDriverRequests.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.msg = '';
      })
      .addCase(getDriverRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload; // Populate requests
      })
      .addCase(getDriverRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.msg = action.payload || 'Failed to fetch driver requests';
      });



  },
});

export default requestSlice.reducer;
