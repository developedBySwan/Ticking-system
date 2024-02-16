import mongoose from "mongoose";

const blockListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const BlockList = mongoose.model("BlockList", blockListSchema);

export default BlockList;
