const express = require("express");
const {createAccount, updateAccount, signin, 
  deleteAccount, getAccount, randomAccount, 
  createAchievement,
  deleteAchievement,
  searchAccount,
  getAccountCoaches,
  getAccountManagers,
  getAccountStorekeepers,
  createComment,
  deleteComment,
  getAccountBySport} = require("../controllers/Account");
// const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middlewares/verifyToken");

//create account
router.post("/", createAccount)

//update account
router.patch("/:id", 
// verifyToken, 
updateAccount)

//delete account
router.delete("/:id", deleteAccount);

//get account
router.get("/find/:id",
// verifyToken, 
getAccount);

//get random account
router.get("/random", 
//  verifyToken 
 randomAccount
);

//login
router.post("/login", signin)

//post achievement
router.post("/achievement/:id", createAchievement)

//post achievement
router.delete("/achievement/:id/:achievementid", deleteAchievement)

//search account
router.get("/search", searchAccount);

//get coach
router.get("/coach", getAccountCoaches);

//get manager
router.get("/manager", getAccountManagers);

//get storekeeper
router.get("/storekeeper", getAccountStorekeepers);

//get sport
router.get("/sport/:sport", getAccountBySport);

//post comment
router.post("/comment/:id", createComment)

//delete comment
router.delete("/comment/:id/:commentid", deleteComment)

//logout


module.exports = router;