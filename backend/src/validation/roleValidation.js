import { check } from "express-validator";
import { validationErrorThrow } from "../helpers/helper.js";
import Role from "../models/Role.js";

const storeRole = [
  check("title")
    .notEmpty()
    .withMessage("Title Field is required")
    .custom(async (req, res, next) => {
      if (req.method === "POST") {
        const roleTitle = await Role.findOne({ title: req.body.title }).exec();

        if (roleTitle) {
          return response(res, "Role Title already exists", 422);
        }
      }
      return next();
    }),
  check("level")
    .notEmpty()
    .withMessage("Level Field should be required")
    .isInt({
      gt: 0,
    })
    .withMessage("Level Field should be number")
    .custom(async (req, res, next) => {
      if (req.method === "POST") {
        const roleLevel = await Role.findOne({ level: req.body.level }).exec();

        if (roleLevel) {
          return response(res, "Role Level already exists", 422);
        }
      }

      return next();
    }),
  async (req, res, next) => {
    if (req.method === "PUT") {
      const roleId = req.params.id;

      const role = await Role.findById(roleId).exec();

      if (!role) {
        return response(res, "Role not found", 404);
      }

      let existingLevelRole = await Role.findOne({
        level,
        _id: {
          $nin: roleId,
        },
      }).exec();

      if (existingLevelRole) {
        return response(res, "Level already exists", 400);
      }

      let existingTitleRole = await Role.findOne({
        title,
        _id: {
          $nin: roleId,
        },
      }).exec();

      if (existingTitleRole) {
        return response(res, "Job Title already exists", 400);
      }
    }
    return next();
  },
  check("permissions")
    .notEmpty()
    .withMessage("Permission Field is required")
    .isArray({ min: 0 }),
];
export { storeRole };
