import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authServices";

// this is to get user if exist!!!
const user = JSON.parse(localStorage.getItem("user"))

const initialState ={
    user: user ? user: null,
    error: false,
    success:false,
    loading: false
}

//register user and sing in!!
export const register =  createAsyncThunk("auth/register",
 async (user, thunkAPI) =>{
  
    const data = await authService.registeUser(user)
 // if check for errors
   if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
    }
  return data;
 })


//logout an user !! 
export const logout =createAsyncThunk("auth/logout", async () =>{ await authService.logout()})

// sing in login
export const login = createAsyncThunk("auth/login" ,
 async (user, thunkAPI) =>{
  
    const data = await authService.login(user)
 // if check for errors
   if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
    }
  return data;
})



export const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers:{
        reset: (state) =>{
            state.loading = false;
            state.error = false;
            state.success= false;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(register.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(register.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null ;
        }).addCase(logout.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
        }).addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(login.rejected, (state,action) => {
            console.log(state, action)
            state.loading = false;
            state.error = action.payload;
            state.user =null;
        })
    }
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;