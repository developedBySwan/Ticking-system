import asyncHandler from "express-async-handler";
import Role from "../models/Role.js";
import { response, storeActivityLog } from "../helpers/helper.js";
import permissions from "../configs/permissions.js";

/**
 * @des list response for role
 *
 * @route GET api/role/list
 *
 * @return Response Rolelist
 *
 * @access private
 */
const roleList = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const roles = await Role.find()
      .sort({
        level: "asc",
        title: "asc",
      })
      .skip((page - 1) * limit)
      .limit(limit);

    const roleCount = await Role.countDocuments();

    const transformedRoles = roles.map((role) => {
      return {
        id: role.id,
        title: role.title,
        description: role.description,
        level: role.level,
      };
    });

    res.status(200).json({
      data: transformedRoles,
      currentPage: page,
      perPage: limit,
      total: roleCount,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @des role store function
 *
 * @route POST api/role/store
 *
 * @access private
 */
const roleStore = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Role.create(req.body);

    await storeActivityLog(req, res, "Ticket");

    await session.commitTransaction();
    session.endSession();

    return response(res, "Role Created Successfully", 200);
  } catch (error) {
    // Abort the transaction and handle the error
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging
    console.error("Error storing ticket:", error);

    // Send an appropriate error response
    return response(res, "Failed to store ticket", 500);
  }
});

/**
 * @des role detail
 *
 * @route GET api/role/detail/:id
 *
 * @access private
 */
const roleDetail = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return response(res, "Role Not Found", 400);
  }

  return res.status(200).json({
    data: {
      id: role.id,
      title: role.title,
      description: role.description,
      level: role.level,
      permissions: role.permissions,
    },
  });
});

/**
 * @des Role Update
 *
 * @route PUT api/role/update/:id
 *
 * @access private
 */
const roleUpdate = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Role.findByIdAndUpdate(req.params.id, req.body);

    await storeActivityLog(req, res, "Ticket");

    await session.commitTransaction();
    session.endSession();

    return response(res, "Update Successfully", 200);
  } catch (error) {
    // Abort the transaction and handle the error
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging
    console.error("Error storing ticket:", error);

    // Send an appropriate error response
    return response(res, "Failed to store ticket", 500);
  }
});

/**
 * @des role delete
 *
 * @route DELETE api/role/delete/:id
 *
 * @access private
 */
const roleDelete = asyncHandler(async (req, res) => {
  const role = await Role.findOne({ _id: req.params.id }).exec();

  await storeActivityLog(req, res, "Ticket");

  if (!role) {
    return response(res, "Role Not Found", 403);
  }

  await Role.findByIdAndDelete(req.params.id);

  response(res, "Role Deleted", 200);
});

/**
 * @des permission list
 *
 * @route GET api/role/permission-list
 *
 */
const permissionList = asyncHandler(async (req, res) => {
  return res.status(200).json({
    data: permissions,
  });
});

export {
  roleList,
  roleStore,
  roleUpdate,
  roleDelete,
  permissionList,
  roleDetail,
};
