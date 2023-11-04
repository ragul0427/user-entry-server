const express = require("express");
const router = express.Router();
const { createUser, getUser, getAllUsers } = require("../Controllers/userController");
const authenticateUser = require("../middleware/validateToken");

router
  .post("/createuser", createUser)
  .post("/getuser", getUser)
  .get("/validateToken", authenticateUser, (req, res) => {
    res.status(200).send(req.user);
  })
  .get("/allusers", getAllUsers);

module.exports = router;
