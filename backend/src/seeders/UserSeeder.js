import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export default async () => {
  const lowestLevelRole = await Role.findOne().sort("level").exec();

  if (!lowestLevelRole) {
    console.error("No roles found in the database");
    return;
  }

  const role_id = lowestLevelRole._id;

  const defaultUsers = [
    {
      username: "Super Admin",
      email: "supderadmin@gmail.com",
      phone: "09650430210",
      password: await bcrypt.hash("secret", 10),
      role_id: role_id,
    },
    {
      username: "Admin",
      email: "admin@gmail.com",
      phone: "09120230340",
      password: await bcrypt.hash("secret", 10),
      role_id: role_id,
    },
  ];

  try {
    await User.deleteMany({}); // Clear existing data
    await User.insertMany(defaultUsers);
    console.log("Default User data inserted successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};
