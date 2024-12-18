import express from "express";
import { deleteUser,  follow,  getUser, updateUser} from "../controllers/user.js";
import { VerifyFollowers, VerifyTokenAndAuth } from "../controllers/verifyToken.js";
const router = express.Router();
router.put("/:id",VerifyTokenAndAuth,updateUser)
router.delete("/:id",VerifyTokenAndAuth,deleteUser)
router.get("/:id",VerifyTokenAndAuth,getUser)
router.put("/:id/follow",VerifyFollowers,follow)





export default router