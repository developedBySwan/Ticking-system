import { isNumber, response } from "../../helpers/helper.js";
import Role from "../../models/Role.js";

async function checkRoleExistence(res, field, value) {
    const role = await Role.findOne({ [field]: value }).exec();
    return role;
}

export default async function roleStoreValidation(req, res, next) {
   const { title, description, level } = req.body;

    if (!title) {
        return response(res,"Title filed is required",400);
    }

    if (!level || level <= 0 || !isNumber(level)) {
        return response(res, "Level should be a positive number", 400);
    }

    if (req.method === 'POST') {
        let existingLevelRole = await checkRoleExistence(res, 'level', level);

        if (existingLevelRole) {
            return response(res,"Level already exists ee",400);
        }
        
        let existingTitleRole = await checkRoleExistence(res, 'title', title);
    
        if (existingTitleRole) {
            return response(res,"Title already exists",400);
        }
    }
    
    if (req.method === 'PUT') {
        const roleId = req.params.id;

        const role = await Role.findById(roleId).exec();

        if (!role) {
            return response(res, "Role not found", 404);
        }
        
        let existingLevelRole = await Role
            .findOne({
                level,
                _id: {
                    $nin : roleId,
                }
            })
            .exec();
    
        if (existingLevelRole) {
            return response(res,"Level already exists",400);
        }
        
        let existingTitleRole = await Role
            .findOne({
                title,
                _id: {
                    $nin : roleId,
                }
            })
            .exec();
        
        if (existingTitleRole) {
            return response(res,"Job Title already exists",400);
        }
    }

    return next();
};