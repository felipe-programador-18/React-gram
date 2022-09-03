import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

//get user photo
export const getUserPhoto = createAsyncThunk("photo/userphotos",
    async(id, thunkAPI) => {  
     const token = thunkAPI.getState().auth.user.token ;
     const data = await photoService.getPhotoId(id,token)
     return data;
    }
)
 

//deleted userphoto
export const DeletedPhoto =  createAsyncThunk("photo/userdeled",
async(id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token ;
    const data =await photoService.deletedPhoto(id,token)
    
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
})

//creating edit slice photo
export const EditPhoto = createAsyncThunk("photo/editphoto",
 async(photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.EditPhoto({ title: photoData.title}
        ,photoData.id,token)
     
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data;
 }
)


//getPhoto byId
export const getUserPhotoId = createAsyncThunk("getphoto/photouserid", 
async(id,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token; 
    const data = await photoService.GetUserId(id,token)
    return data;
}
)

//creating function to adding like here
export const likeHere = createAsyncThunk("photoLike/likephoto",
async(id, thunkAPI) => {
   const token = thunkAPI.getState().auth.user.token;
   const data = await photoService.CreateLike(id,token)
   
   if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
   }
   
   return data;
}
)

// comments slice
export const comment = createAsyncThunk("photo/comment",
async(photoData, thunkAPI) => {
   const token = thunkAPI.getState().auth.user.token;
   
   const data = await photoService.comment(
    {comment: photoData.comment},
    photoData.id
    ,token)

  if(data.errors){
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data;
}
)

// get all photo
export const getAllPhoto = createAsyncThunk("getallphoto/allphoto",
 async(_,thunkAPI) => {
     const token = thunkAPI.getState().auth.user.token;
     const data = await photoService.getAllPhoto(token)
     return data ;
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
        }).addCase(DeletedPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(DeletedPhoto.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = state.photos.filter((photo) =>{
               return photo._id !== action.payload.id
            })
            state.message = action.payload.message
        }).addCase(DeletedPhoto.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo ={};
        }).addCase(EditPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(EditPhoto.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            
            state.photos.map((photo) => {
             if(photo._id === action.payload.photo._id){
                return photo.title = action.payload.photo.title   
                }
                return photo;
            })
            state.message = action.payload.message
        }).addCase(EditPhoto.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo ={};
        }).addCase(getUserPhotoId.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getUserPhotoId.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
        }).addCase(likeHere.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;

            if(state.photo.likes){
                state.photo.likes.push(action.payload.userId)
            }
            
            state.photos.map((photo) => {
             if(photo._id === action.payload.photoId){
                return photo.likes.push(action.payload.userId)  
                }
                return photo;
            })
            state.message = action.payload.message
        }).addCase(likeHere.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(comment.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            
            state.photo.comments.push(action.payload.comment)
          
            state.message = action.payload.message
        }).addCase(comment.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(getAllPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getAllPhoto.fulfilled, (state,action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        })
     }   
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer