import express from 'express';

import userStoreValidation from '../../middlewares/User/userStoreValidation.js';
import userLoginValidation from '../../middlewares/User/userLoginValidation.js';

import {
    registerUser,
    loginUser,
} from "../../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register',userStoreValidation,registerUser);

userRouter.put('/update');

userRouter.post('/login',userLoginValidation,loginUser);

export default userRouter;