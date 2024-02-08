import { isNumber, response } from "../../helpers/helper.js";

export default function userLoginValidation(req, res, next) {
   const { phone, password } = req.body;

    if (!phone) {
        return response(res, "Phone Field is Required",400)
    }

    if (!isNumber(phone)) {
        return response(res, "Phone Field Should Be Number",400)
    }

    if (!password) {
        return response(res, "Password Field is Required",400);
    }

    next();
}
