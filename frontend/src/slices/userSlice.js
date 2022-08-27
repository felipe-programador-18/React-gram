import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../services/userService";


const initialState ={
    user:{},
    error: false,
    loading: false,
    success: false,
    message : null
}

// creating function that get user
export const profile = createAsyncThunk("user/profile", 
async (user, thunkAPI ) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token);
    return data; 
 }
)


//update user details
export const updateProfile = createAsyncThunk("user/update",
 async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.updateProfileUser(user, token);

   // if give wrong  
   if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0]);
   }
  return data;
    
}

)



export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
    resetMessage : (state) => {
        state.message = null
      }
    },

    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(profile.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateProfile.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!"
        }).addCase(updateProfile.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null ;
        })
    }
})


//reminder reducer always have state and action!

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;


