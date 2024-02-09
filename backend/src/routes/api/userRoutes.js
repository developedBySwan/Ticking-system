import express from 'express';
import authorize from "../../middlewares/permissionHandler.js";

import userStoreValidation from '../../middlewares/User/userStoreValidation.js';
import userLoginValidation from '../../middlewares/User/userLoginValidation.js';
import validateTokenHandler from '../../middlewares/validateTokenHandler.js';

import {
    registerUser,
    loginUser,
    updateUser,
    userList
} from "../../controllers/userController.js";

const userRouter = express.Router();

userRouter.post(
    '/register',
    userStoreValidation,
    registerUser
);

userRouter.put(
    "/update/:id",
    validateTokenHandler,
    userStoreValidation,
    updateUser
);

userRouter.post(
    '/login',
    userLoginValidation,
    loginUser
);

userRouter.get(
    '/user-list',
    validateTokenHandler,
    authorize('user-list'),
    userList,
)

export default userRouter;