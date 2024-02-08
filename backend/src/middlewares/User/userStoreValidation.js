import { isNumber, isValidMail, response } from "../../helpers/helper.js";

export default function userStoreValidation(req, res, next) {
   const { username, email, phone, password } = req.body;
    
    if (!username) {
        return response(res, "User Name Field is Required",400)
    }

    if (!email) {
        return response(res, "Email Field is Required",400);
    }

    if (!phone) {
        return response(res,"Phone Field is Required",400);
    }

    if (!password) {
        return response(res,"Password Field is Required",400);
    }

    if (!isNumber(phone)) {
        return response(res,"Phone Field Should Be Number",400);
    }

    if (!isValidMail(email)) {
        return response(res,"Invalid email format",400);
    }
     
    next();
}