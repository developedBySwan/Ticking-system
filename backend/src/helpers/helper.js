/**
  * @des Check Value is number
 * 
 * @param {string|number} value
 * 
 * @returns bool
 */
function isNumber(value) {
  return (typeof value === 'number' || !isNaN(parseFloat(value)) && isFinite(value));
}

/**
 * @des Check Value is mail or not
 * 
 * @param {string} mail
 * 
 * @returns bool
 */
function isValidMail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(mail);
}

/**
 * @des Json Response short hand
 * 
 * @param message string
 * 
 * 
 */
function response(res, message, code = 200)
{
    return res
         .status(code)
         .json({ message: message });
}

export {
    isNumber,
    isValidMail,
    response
}