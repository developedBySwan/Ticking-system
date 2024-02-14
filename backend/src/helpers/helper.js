import ActivityLog from "../models/ActivityLog.js";
import { validationResult } from "express-validator";

/**
 * @des Check Value is number
 *
 * @param {string|number} value
 *
 * @returns bool
 */
function isNumber(value) {
  return (
    typeof value === "number" || (!isNaN(parseFloat(value)) && isFinite(value))
  );
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
 */
function response(res, message, code = 200) {
  return res.status(code).json({ message: message });
}

async function storeActivityLog(
  req,
  res,
  model,
  newData = null,
  oldData = null
) {
  let sanitizedData = {};
  // Sanitize sensitive data based on requirements and privacy concerns
  if (req.body) {
    sanitizedData.body = { ...req.body };
    delete sanitizedData.body.password;
    delete sanitizedData.body.creditCardNumber;
  }

  const action = getActionFromRequest(req);

  const logEntry = {
    userId: req.user ? req.user._id : req.socket.remoteAddress,
    ip: req.socket.remoteAddress,
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    model,
    action,
    newData: newData,
    olData: oldData,
    sanitizedData,
    meta: {
      sessionID: req.sessionID,
      referrer: req.headers.referer,
      userAgent: req.headers["user-agent"],
    },
  };

  const activityLog = new ActivityLog(logEntry);
  await activityLog.save();
}

function getActionFromRequest(req) {
  // Based on HTTP method and route parameters/body
  switch (req.method) {
    case "POST":
      return "CREATE";
    case "PUT":
      return "UPDATE";
    case "DELETE":
      return "DELETE";
    default:
      console.warn("Unhandled HTTP method for logging action:", req.method);
      return "UNKNOWN";
  }
}

function validationErrorThrow() {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else next();
  };
}

export {
  isNumber,
  isValidMail,
  response,
  storeActivityLog,
  validationErrorThrow,
};
