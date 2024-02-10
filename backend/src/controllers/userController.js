import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/User.js";
import { response, storeActivityLog } from "../helpers/helper.js";
import Role from "../models/Role.js";

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
      { phone: phone }, // Assuming you have a phone field in your user model
    ],
  });

  if (checkUser) {
    return res.status(400).json({ message: "User Is Already Exists" });
  }

  const user = await User.create({
    username,
    email,
    phone,
    password: await bcrypt.hash(password, 10),
  });

  if (user) {
    await storeActivityLog(req, res, "User");

    return res.status(201).json({
      message: "User Create Successfully",
      user: {
        _id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: {
          _id: user.role_id._id,
          title: user.role_id.title,
          level: user.role_id.level,
        },
        token: generateJWTToken(user),
      },
    });
  } else {
    return response(res, "User is already exists", 400);
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

  const user = await User.findOne({ phone: phone }).populate("role_id").exec();

  if (user && bcrypt.compareSync(password, user.password)) {
    await storeActivityLog(req, res, "User");

    return res.status(200).json({
      message: "User Login Successfully",
      user: {
        _id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: {
          _id: user.role_id._id,
          title: user.role_id.title,
          level: user.role_id.level,
          permissions: user.role_id.permissions,
        },
        token: generateJWTToken(user),
      },
    });
  } else {
    response(res, "User Not Found", 422);
  }
});

/**
 * @des update user data
 *
 * @route PUT api/user/update
 *
 * @access private
 *
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return response(res, "User Not Found", 403);
  }

  const { username, email, phone, password, role_id } = req.body;

  const role = await Role.findById(role_id);

  if (!role) {
    return response(res, "Role Not Found", 403);
  }

  await User.findByIdAndUpdate(req.params.id, {
    username,
    email,
    phone,
    password: await bcrypt.hash(password, 10),
    role_id: role_id,
  });

  await storeActivityLog(req, res, "User");

  return response(res, "Updated Successfully", 200);
});

/**
 * @des user list
 *
 * @route GET /api/user-list/
 *
 * @access private
 */
const userList = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const users = await User.find()
      .populate("role_id")
      .skip((page - 1) * limit)
      .limit(limit);

    const userCount = await User.countDocuments();

    const transformedUsers = users.map((user) => {
      return {
        _id: user.id,
        username: user.username,
        mail: user.email,
        phone: user.phone,
        role: {
          _id: user.role_id?._id,
          title: user.role_id?.title,
          level: user.role_id?.level,
        },
      };
    });

    return res.status(200).json({
      data: transformedUsers,
      currentPage: page,
      perPage: limit,
      total: userCount,
    });
  } catch (err) {
    response(res, "Internal Server Error", 500);
  }
});

/**
 * @des to generate JWT token
 *
 * @param { User } user
 * @returns string JWT token
 */
function generateJWTToken(user) {
  return jwt.sign(
    {
      user: {
        username: user.username,
        phone: user.phone,
        _id: user.id,
        role: {
          _id: user.role_id._id,
          title: user.role_id.title,
          level: user.role_id.level,
          permissions: user.role_id?.permissions,
        },
      },
    },
    process.env.JWT_TOKEN_SECRET
  );
}

export { registerUser, loginUser, updateUser, userList };
