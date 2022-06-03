const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  postLocation,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
//router.post("/location", postLocation);
router.route("/location").post(protect, postLocation);
//router.route("/").get(protect, allUsers1);


module.exports = router;
