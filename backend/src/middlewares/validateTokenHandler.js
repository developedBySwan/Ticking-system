import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { response } from "../helpers/helper.js";

export default asyncHandler(async (req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    // check header has Bearer token
    if (authHeader && authHeader.startsWith("Bearer")) {
        // get token with remove Bearer string
        token = authHeader.split(" ")[1];

        if (!token) {
            return response(res, "User is not authorized", 401);
        }

        return jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return response(res, "User is not authorized", 401);
            }

            req.user = decoded.user;

            next();
        });
    }

    return response(res, "User is not authorized", 401);
})