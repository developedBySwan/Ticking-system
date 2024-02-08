import express from 'express';

import userStoreValidation from '../../middlewares/User/userStoreValidation.js';

import {
    registerUser,
} from "../../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register',userStoreValidation,registerUser);

userRouter.put('/update');

userRouter.post('/login');

export default userRouter;