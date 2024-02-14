import { check } from "express-validator";
import { validationErrorThrow } from "../helpers/helper.js";

const loginValidation = [
  check("phone")
    .notEmpty()
    .withMessage("Phone number Field is required!")
    .isInt()
    .withMessage("Phone Number Should Be Number"),
  check("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Password should be more than three words"),
  validationErrorThrow(),
];

const storeValidation = [
  check("username")
    .notEmpty()
    .withMessage("User Name Field is required")
    .isString()
    .withMessage("User Name must be string"),
  check("email")
    .notEmpty()
    .withMessage("Email Field is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("phone")
    .notEmpty()
    .withMessage("Phone number Field is required!")
    .isInt()
    .withMessage("Phone Number Should Be Number"),
  check("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Password should be more than three words"),
  validationErrorThrow(),
];

export { loginValidation, storeValidation };
