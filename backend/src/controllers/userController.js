import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isNumber } from "../helpers/helper.js";

/**
 * @desc Register user
 * 
 * @route POST api/user/register
 * 
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
   const { username, email, phone, password } = req.body;

   const checkUser = await User.findOne({
            $or: [
                { email: email },
                { phone: phone } // Assuming you have a phone field in your user model
            ]
   });
   
   if (checkUser) {
      return res.status(400).json({message : "User Is Already Exists"});
   }

   const user = await User.create({
      username,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
   });
   
   if (user) {
      return res.status(201).json({
         message: "User Create Successfully",
         user: {
            _id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            token: jwt.sign(
                  {
                     user: {
                        username: user.username,
                        phone: user.phone,
                        id: user.id,
                     },
                  },
                  process.env.JWT_TOKEN_SECRET
               ),
         }
      });
  } else {
      res.status(400);
      throw new Error("user is already exists");
   }
});

/**
 * @desc Login User
 * 
 * @route POST api/user/login
 * 
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
   const { phone, password } = req.body;

   if (!password || !phone) {
      res.status(400);
      throw new Error("All fields are required!");
   }
   
   const user = User.findOne({
      phone: phone,
      password: await bcrypt.compare(password, user.password)
   });

   if (user) {
      res.status(200).json({

      })
   } else {
      res.status(401);
      throw new Error("Invalid Account");
   }
});

export {
   registerUser,
   loginUser,
}