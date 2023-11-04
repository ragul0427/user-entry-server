const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: "User already registered" });
    }

    await User.create({ ...req.body });
    return res.status(200).send({ data: "Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).send({ message: "User not found register first" });
    }

    if (existingUser.password !== password) {
      return res.status(400).send({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "abcd123",
      { expiresIn: "10000h" }
    );

    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
  }
};


const getAllUsers=async(req,res)=>{
  try{
    const result=await User.find()
    return res.status(200).send({message:result})
  }catch(err){
    console.log(err)
  }
}

module.exports = { createUser, getUser,getAllUsers };
