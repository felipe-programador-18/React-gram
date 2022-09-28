const mongoose = require("mongoose")

//create connection about mongodeb
const dbUser =process.env.DB_USER;
const dbPassword = process.env.DB_SENHA;

const conn = async () => {
    try {
       const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.re7jn.mongodb.net/?retryWrites=true&w=majority`)

       console.log("connected in the database!") 
      return dbConn
    } catch (error) {
        console.log("error in connection", error)
    }
}
conn();

module.exports = conn;