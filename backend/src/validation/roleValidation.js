import { check } from "express-validator";
import { validationErrorThrow } from "../helpers/helper.js";
import Role from "../models/Role.js";
import { response } from "../helpers/helper.js";

const storeRole = [
  check("title")
    .notEmpty()
    .withMessage("Title Field is required")
    .custom(async (value, { req }) => {
      if (req.method === "POST") {
        const roleTitle = await Role.findOne({ title: value }).exec();

        if (roleTitle) {
          throw new Error("Role Title already exists");
        }
      }
    }),
  check("level")
    .notEmpty()
    .withMessage("Level Field should be required")
    .isInt({
      gt: 0,
    })
    .withMessage("Level Field should be number")
    .custom(async (value, { req }) => {
      if (req.method === "POST") {
        const roleLevel = await Role.findOne({ level: value }).exec();

        if (roleLevel) {
          throw new Error("Role Level already exists");
        }
      }
    }),
  async (req, res, next) => {
    if (req.method === "PUT") {
      const roleId = req.params.id;

      const role = await Role.findById(roleId).exec();

      if (role) {
        return response(res, "Role already exists", 403);
      }

      let existingLevelRole = await Role.findOne({
        level: req.params.level,
        _id: {
          $nin: roleId,
        },
      }).exec();

      if (existingLevelRole) {
        return response(res, "Role Level already exists", 403);
      }

      let existingTitleRole = await Role.findOne({
        title: req.params.title,
        _id: {
          $nin: roleId,
        },
      }).exec();

      if (existingTitleRole) {
        return response(res, "Job Title already exists", 403);
      }
    }
    return next();
  },
  check("permissions")
    .notEmpty()
    .withMessage("Permission Field is required")
    .isArray({ min: 0 }),
  validationErrorThrow(),
];

export { storeRole };
