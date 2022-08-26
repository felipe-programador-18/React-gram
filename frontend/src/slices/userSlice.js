import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";




const initialState ={
    user:{},
    loading: false,
    error: false,
    success: false,
    message : null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    
    reducers:{
        resetMessage : (state) => {
         state.message = null
        }
    }

})


//reminder reducer always have state and action!

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;


