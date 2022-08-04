const mongoose  = require("mongoose")
const {Schema} = mongoose;


const userPhotoSchema = new Schema({
 image: String,
 title: String,
 likes : Array,
 comments: Array,
 userId: mongoose.ObjectId,
 userName: String
},
 {
  timestamps: true
 }
)

const PhotoUser = new mongoose.model("Photo", userPhotoSchema)
//defined user photouser 

module.exports = PhotoUser ;