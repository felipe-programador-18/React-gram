require("dotenv").config()

const express = require("express")
const app = express()

const path = require("path")
const cors = require("cors")

const port =  process.env.PORT;

//set up to receive in json and data response!!
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//solve issues about cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//db connection
require("./config/db.js");

//router of express
const route = require("./Routes/router.js")
const { dirname } = require("path")
app.use(route)


app.listen( port, () => {
   console.log(`listing in the port ${port}`)     
})