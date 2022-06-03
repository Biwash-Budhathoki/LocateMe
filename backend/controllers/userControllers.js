const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //console.log(req);
  res.send(users);
});




/*/#################################################

//@description     Get or Search all users
//@route           GET /api/user?lat=27&lng=82
//@access          Public
const allUsers1 = asyncHandler(async (req, res) => {
  const users= await User.geoNear(
    {type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    {maxDistance: 1000, spherical:true}
  )
    res.send(users);

 // const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //res.send(users);
});


//#################################################

const allUsers = asyncHandler(async (req, res) => {
  //const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  const users = await User.find({ name:{$regex: "Mausam" }});
  console.log(users);
  res.send(users);
});
*/
//#################################################

//###########################################


//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      location:"test",
      //location:user.location,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//#########################################
//@description     Get or Search all users
//@route           POST /api/user/location
//@access          Public
const postLocation = asyncHandler(async (req, res) => {
  const { lng , lat } =req.body;
  const user = await User.find({ _id : { $eq: req.user._id } });
    if (user){
      const updateLocation = await User.updateMany({"_id":req.user._id},{$set: {"location" : { "type" : "Point", "coordinates" : [ lng, lat ] }}});
       const userdai= await User.aggregate([
         {
           $geoNear: {
            near: { type: "Point", coordinates: [parseFloat(lng),parseFloat(lat)] },
            distanceField: "dist.calculated",
             maxDistance: 1000, spherical:true}
           
    }]);
  console.log(userdai);
      res.json({
         name: user[0].name,
         email: user[0].email,
         location: user[0].location,
      });
    };
  //console.log(foundUser); 
  //console.log(updateLocation);
  console.log(user[0]._id);
});

module.exports = { allUsers, postLocation, registerUser, authUser } ;
