import asyncHandler from "express-async-handler";
import Role from "../models/Role.js";
import { response } from "../helpers/helper.js";

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
                level: 'asc',
                title: 'asc'
            })
            .skip((page - 1) * limit)
            .limit(limit);
      
        const roleCount = await Role.countDocuments();
      
        const transformedRoles = roles.map(role => {
            return {
                id: role.id,
                title: role.title,
                description: role.description,
                level: role.level,
            }
        })
      
        res
            .status(200)
            .json({
                data: transformedRoles,
                currentPage: page,
                perPage: limit,
                total: roleCount,
            });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
})

/**
 * @des role store function
 * 
 * @route POST api/role/store
 * 
 * @access private
 */
const roleStore = asyncHandler(async (req, res) => {
    await Role.create(req.body);

    response(res, "Role Created Successfully", 200);
})

/**
 * @des Role Update
 * 
 * @route PUT api/role/update/:id
 * 
 * @access private
 */
const roleUpdate = asyncHandler(async (req, res) => {
    await Role.findByIdAndUpdate(
        req.params.id,
        req.body,    
    )

    response(res, "Update Successfully", 200);
})

/**
 * @des role delete
 * 
 * @route DELETE api/role/delete/:id
 * 
 * @access private
 */
const roleDelete = asyncHandler(async (req, res) => {
    const role = await Role.findOne({ _id : req.params.id }).exec();

    if (!role) {
      return response(res,"Role Not Found",403)
    }

    await Role.findByIdAndDelete(req.params.id);

    response(res, "Role Deleted", 200);
})

export {
    roleList,
    roleStore,
    roleUpdate,
    roleDelete,
}