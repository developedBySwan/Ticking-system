import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  ip: { type: String, required: true },
  method: { type: String, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  model: { type: String, required: true },
  action: { type: String, required: true },
  modifiedFields: { type: Object },
  newData: { type: Object },
  deletedData: { type: Object },
  timestamp: { type: Date, default: Date.now },
  // Sanitized data for sensitive information
  sanitizedData: { type: Object },
  // Additional context-specific data (optional)
  meta: { type: Object },
});

const ActivityLog = mongoose.model("ActivityLog", ActivityLogSchema);

export default ActivityLog;
