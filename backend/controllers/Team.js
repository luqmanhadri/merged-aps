const Account  = require("../models/Account.js");
const Team  = require("../models/Team.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createTeam = async (req, res, next) => {
    const newTeam = new Team({ userId: req.user.id, ...req.body });
    try {
      const savedTeam = await newTeam.save();
      res.json(savedTeam);
    } catch (err) {
      next(err);
    }
  };

const updateTeam = async (req,res,next) =>{
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return next(res.json("Profile not found!"));
    if (req.user.id === team.userId) {
      const updatedTeam = await Team.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedTeam);
    } else {
      return next(res.json("You can update only your profile!"));
    }
  } catch (err) {
    next(err);
  }
    
}

// const randomAthleteProfile = async (req, res, next) => {
//   try {
//     const profile = await AthleteProfile.aggregate([{ $sample: { size: 2 } }]);
//     res.json(profile);
//   } catch (err) {
//     next(err);
//   }
// };

const getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    res.json(team);
  } catch (err) {
    next(err);
  }
};

// const addImage = async (req,res,next) =>{
//   try {
//     const profile = await AthleteProfile.findById(req.params.id);
//     if (!profile) return next(res.json("Profile not found!"));
//     if (req.user.id === profile.userId) {
//       const updatedProfile = await AthleteProfile.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.json(updatedProfile);
//     } else {
//       return next(res.json("You can update only your profile!"));
//     }
//   } catch (err) {
//     next(err);
//   }
    
// }
  

module.exports = {createTeam, updateTeam, getPro}