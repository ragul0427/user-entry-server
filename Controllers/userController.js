const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ ...req.body, password: hashedPassword });
    
    return res.status(200).json({ data: "Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found. Register first." });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "abcd123", 
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    return res.status(200).json({ message: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createUser, getUser, getAllUsers };
