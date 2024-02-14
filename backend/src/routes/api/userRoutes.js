import express from "express";
import authorize from "../../middlewares/permissionHandler.js";

import validateTokenHandler from "../../middlewares/validateTokenHandler.js";

import {
  registerUser,
  loginUser,
  updateUser,
  userList,
} from "../../controllers/userController.js";
import {
  loginValidation,
  storeValidation,
} from "../../validation/userValidation.js";

const userRouter = express.Router();

userRouter.post("/register", storeValidation, registerUser);

userRouter.put(
  "/update/:id",
  validateTokenHandler,
  storeValidation,
  updateUser
);

userRouter.post("/login", loginValidation, loginUser);

userRouter.get(
  "/user-list",
  validateTokenHandler,
  authorize("user-list"),
  userList
);

export default userRouter;
