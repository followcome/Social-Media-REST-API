import express from "express";
import { deleteUser,  follow,  getUser, unfollow, updateUser} from "../controllers/user.js";
import { VerifyFollowers, VerifyTokenAndAuth } from "../controllers/verifyToken.js";
const router = express.Router();
router.put("/:id",VerifyTokenAndAuth,updateUser)
router.delete("/:id",VerifyTokenAndAuth,deleteUser)
router.get("/:id",VerifyTokenAndAuth,getUser)
router.put("/:id/follow",VerifyFollowers,follow)
router.put("/:id/unfollow",VerifyFollowers,unfollow)






export default router