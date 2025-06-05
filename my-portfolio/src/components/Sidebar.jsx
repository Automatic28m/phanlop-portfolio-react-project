import React from "react";

function Sidebar() {
  return (
    <div className="w-fit min-h-screen bg-white px-6 py-16">
      <div className="font-durer text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-200 bg-clip-text text-transparent">
        Portfolio <br />
        Dashboard
      </div>
      <div className="h-0.5 bg-gray-200 w-full rounded-full my-3"></div>
      <div className="flex flex-col justify-between h-full">
        <ul className="text-xl flex flex-col gap-3">
          <li>
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="/displayPortfolio" className="hover:text-blue-600">
              Display
            </a>
          </li>
          <li>
            <a href="/createPortfolio" className="hover:text-blue-600">
              Create New
            </a>
          </li>
          <li>
            <a href="/manageSkillTypes" className="hover:text-blue-600">
              Skill Types
            </a>
          </li>
        </ul>
        <ul className="text-xl flex flex-col">
          <li>
            <a href="/logout" className="hover:text-blue-600">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
