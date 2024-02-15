/* eslint-disable no-unused-vars */
import React from "react";
import { navLinks } from "../../../constant";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

export const NavBar = () => {
  const { auth, logout } = useAuth();
  const filterNavs = navLinks.filter((role) =>
    auth?.role?.permissions?.includes(role.permission)
  );
  return (
    <>
      <nav className="w-full px-10 py-5 flex items-center justify-between">
        <ul className="flex">
          {filterNavs?.map((nav) => (
            <li className="mr-6" key={nav.id}>
              <Link
                className="text-blue-500 hover:text-blue-800"
                href={nav.url}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
        {auth?.token && (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Log out
          </button>
        )}
      </nav>
    </>
  );
};
