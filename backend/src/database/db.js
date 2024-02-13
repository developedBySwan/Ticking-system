import mongoose from "mongoose";
import RoleSeeder from "../seeders/RoleSeeder.js";
import UserSeeder from "../seeders/UserSeeder.js";
import Role from "../models/Role.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MongoDB URI is not provided in the environment variables.");
  process.exit(1);
}

const db = async () => {
  mongoose
    .connect(MONGODB_URI)
    .then(async () => {
      try {
        const roleCount = await Role.countDocuments();

        if (!roleCount) {
          await RoleSeeder();
          await UserSeeder();
        }

        console.log("Connected To MongoDb");
      } catch (err) {
        console.error("Error To Connect Db:: ", err);
      }
    })
    .catch((error) => console.error("MongoDB connection error:", error));
};

export default db;
