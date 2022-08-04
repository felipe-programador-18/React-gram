const express = require("express")
const router = express.Router()

//seems about this controllers
router.use("/api/users", require("./Userroutes") )

router.get("/", (req,res) => {
    res.send("Api Working Here now!!")
})


module.exports = router;