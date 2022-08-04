const mongoose = require("mongoose")
const {Schema} =  mongoose

//here i define kind of that go receive in date shape!
const userSchema = new Schema({
  name: String,
  email: String,
  password:String,
  profileImage: String,
  bio: String
}, {
    timestamps: true
}
);

//defined user model
const User = mongoose.model("User", userSchema)
module.export = User