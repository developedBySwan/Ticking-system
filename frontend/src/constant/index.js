/* eslint-disable no-unused-vars */

export const permission = {
  user: "user-list",
  ticket: "ticket-list",
  role: "role-list",
};

export const navLinks = [
  {
    id: 1,
    name: "User",
    url: "/user",
    permission: permission.user,
  },
  {
    id: 2,
    name: "Ticket",
    url: "/ticket",
    permission: permission.ticket,
  },
  {
    id: 3,
    name: "Role",
    url: "/role",
    permission: permission.role,
  },
];
