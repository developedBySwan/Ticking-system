/* eslint-disable no-unused-vars */
import React from "react";
import { navLinks } from "../../../constant";

export const NavBar = () => {
  let isLoggedin = true;
  const userPermissions = ["permission.user", "permission.role"];
  const filterNavs = navLinks.filter((route) =>
    userPermissions.includes(route.permission)
  );
  return (
    <>
      <nav className="w-full px-10 py-5 flex items-center justify-between">
        <ul className="flex">
          {filterNavs?.map((nav) => (
            <li className="mr-6" key={nav.id}>
              <a className="text-blue-500 hover:text-blue-800" href={nav.url}>
                {nav.name}
              </a>
            </li>
          ))}
        </ul>
        {isLoggedin && (
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white">
            Log out
          </button>
        )}
      </nav>
    </>
  );
};
