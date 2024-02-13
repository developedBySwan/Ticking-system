import permissions from "../configs/permissions.js";
import Role from "../models/Role.js";

export default async () => {
  const defaultRoles = [
    {
      title: "Default Admin Role",
      description: "Generated Default Role",
      level: 1,
      permissions: permissions,
    },
  ];

  try {
    await Role.deleteMany({}); // Clear existing data
    await Role.insertMany(defaultRoles);
    console.log("Default Role data inserted successfully");
  } catch (err) {
    console.error("Error seeding Role data:", err);
  }
};
