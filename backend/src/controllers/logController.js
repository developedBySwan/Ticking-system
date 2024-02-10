import ActivityLog from "../models/ActivityLog.js";
import asyncHandler from "express-async-handler";

const logList = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const activityLogs = await ActivityLog.find()
    .sort({
      timestamp: "desc",
    })
    .skip((page - 1) * limit)
    .limit(limit);

  const activityLogsCounts = await ActivityLog.countDocuments();

  let data = activityLogs.map((log) => {
    return {
      _user_id: log.userId,
      ip: log.ip,
      method: log.method,
      url: log.url,
      statusCode: log.statusCode,
      model: log.model,
      action: log.action,
      modifiedFields: log.modifiedFields,
      newData: log.newData,
      deletedData: log.deletedData,
      sanitizedData: log.sanitizedData,
      meta: log.meta,
    };
  });

  return res.status(200).json({
    data: data,
    page: page,
    perPage: limit,
    total: activityLogsCounts,
  });
});

export { logList };
