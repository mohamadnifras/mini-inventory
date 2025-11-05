import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../api/axiosInstance";
import { handleError } from "../utils/handleError";


const initialState = {
    loading: false,
    success: false,
    error: null,
    products: [],
    product: null,
    total: 0,
    page: 0,
    currentPage: 1,
    hasMore: true
}

export const allProduct = createAsyncThunk('product/AllProduct', async ({ page , limit },{ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/product/getProduct?page=${page}&limit=${limit}`);
        
        return response.data
    } catch (error) {
        rejectWithValue(handleError(error))
    }
})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allProduct.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(allProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products =action.payload.products;
                state.error = null
            })
            .addCase(allProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})



export default productSlice.reducer