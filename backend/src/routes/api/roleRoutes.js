import express from 'express';

import validateTokenHandler from '../../middlewares/validateTokenHandler.js';

import {
    roleList,
    roleStore,
    roleUpdate,
    roleDelete,
    permissionList,
    roleDetail
} from "../../controllers/roleController.js";
import roleStoreValidation from '../../middlewares/Role/roleStoreValidation.js';
import authorize from "../../middlewares/permissionHandler.js";

const roleRouter = express.Router();

roleRouter.use(validateTokenHandler);

roleRouter
    .get(
        '/list',
        authorize('role-list'),
        roleList
)
    
roleRouter
    .post(
        '/store',
        authorize('role-store'),
        roleStoreValidation,
        roleStore
    )
    
roleRouter
        .put(
            '/update/:id',
            authorize('role-update'),
            roleStoreValidation,
            roleUpdate
        )
        
roleRouter
        .delete(
            '/delete/:id',
            authorize('role-delete'),
            roleDelete
        )
        
roleRouter
    .get(
        '/permission-list',
        authorize('permission-list'),
        permissionList,
)

roleRouter
    .get(
        '/detail/:id',
        roleDetail
        )
    
export default roleRouter;
