import express from 'express';

import validateTokenHandler from '../../middlewares/validateTokenHandler.js';

import {
    roleList,
    roleStore,
    roleUpdate,
    roleDelete
} from "../../controllers/roleController.js";
import roleStoreValidation from '../../middlewares/Role/roleStoreValidation.js';

const roleRouter = express.Router();

roleRouter.use(validateTokenHandler);

roleRouter
    .get(
        '/list',
        roleList
)
    
roleRouter
    .post(
        '/store',
        roleStoreValidation,
        roleStore
    )
    
roleRouter
        .put(
            '/update/:id',
            roleStoreValidation,
            roleUpdate
        )
        
roleRouter
        .delete(
            '/delete/:id',
            roleDelete
        )
    
export default roleRouter;
