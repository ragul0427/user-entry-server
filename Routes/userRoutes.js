const express=require("express")
const router=express.Router()
const {createUser,getUser,getAllUsers}=require("../Controllers/userController")
const authenticateUser=require("../middleware/validateToken")

router.post("/createuser",createUser)
router.post("/getuser",getUser)
router.get("/validateToken",authenticateUser,(req,res)=>{
    res.status(200).send(req.user);
})
router.get("/allusers",getAllUsers)

module.exports=router