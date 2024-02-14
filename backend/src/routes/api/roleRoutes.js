import express from "express";

import validateTokenHandler from "../../middlewares/validateTokenHandler.js";
import { storeRole } from "../../validation/roleValidation.js";

import {
  roleList,
  roleStore,
  roleUpdate,
  roleDelete,
  permissionList,
  roleDetail,
} from "../../controllers/roleController.js";
import authorize from "../../middlewares/permissionHandler.js";

const roleRouter = express.Router();

roleRouter.use(validateTokenHandler);

roleRouter.get("/list", authorize("role-list"), roleList);

roleRouter.post("/store", authorize("role-store"), storeRole, roleStore);

roleRouter.put("/update/:id", authorize("role-update"), storeRole, roleUpdate);

roleRouter.delete("/delete/:id", authorize("role-delete"), roleDelete);

roleRouter.get(
  "/permission-list",
  authorize("permission-list"),
  permissionList
);

roleRouter.get("/detail/:id", roleDetail);

export default roleRouter;
