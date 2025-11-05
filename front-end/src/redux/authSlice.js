import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance";
import { handleError } from "../utils/handleError";

const initialState = {
    users: [],
    user: null,
    isAuthenticated: false,
    adminAuthenticated: false,
    loading: false,
    error: null,
    totalUsers: 0
}


export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = axiosInstance.post('/auth/sign-up', userData);
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("auth/sign-in", userData);
        return response.data
    } catch (error) {
        return rejectWithValue(handleError(error))
    }
})

export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/me")
            return response.data.user;
        } catch (error) {
            if (error.response?.status === 401) {
                return rejectWithValue("Please login with your credentials ")
            }
            return rejectWithValue(handleError(error))
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/logout")
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error))
        }
    }

)


export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth//refresh-token");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user;
                if (action.payload.user.role == 'admin') {
                    state.adminAuthenticated = true
                }
                if (action.payload.user.role == 'user') {
                    state.isAuthenticated = true
                }
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //fetch User Details
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null;

                if (action.payload.role === 'admin') {
                    state.adminAuthenticated = true
                    state.isAuthenticated = false
                } else if (action.payload.role === 'user') {
                    state.adminAuthenticated = false
                    state.isAuthenticated = true
                } else {
                    state.adminAuthenticated = false
                    state.isAuthenticated - false
                }
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload;
                state.user = null
                state.isAuthenticated = false
                state.adminAuthenticated = false;
            })
            //logoutUser
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.adminAuthenticated = false
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload;
            })
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state,) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})



export default authSlice.reducer
