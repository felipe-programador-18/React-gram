import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useCallback } from "react";

import photoService from "../services/photoService";


const initialState ={
    photos:[],
    photo:{},
    error: false,
    success: false,
    loading: false,
    message: null
}

// creating function to adding photo
export const publishPhoto = createAsyncThunk("photo/publish",
 async(photo, thunkAPI) => {
  
   const token = thunkAPI.getState().auth.user.token;
   const data =  await photoService.publishPhoto(photo, token)
 
   if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
   }
   
   return data;
 }
)


export const getUserPhoto = createAsyncThunk("photo/userphotos",
    async(id, thunkAPI) => {  
     const token = thunkAPI.getState().auth.user.token ;
     const data = await photoService.getPhotoId(id,token)
     return data;
    }
   )
 


export const photoSlice =  createSlice({
    name:"photo" ,
    initialState,
    reducers:{
        resetMessage: (state) =>{
          state.message = null;
        },
    },
 
     extraReducers:(builder) => {
        builder.addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(publishPhoto.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photos.unshift(state.photo)
            state.message = "Photo atualizada com sucesso!"
        }).addCase(publishPhoto.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo ={};
        }).addCase(getUserPhoto.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getUserPhoto.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
     }   
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer