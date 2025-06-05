import React from "react";
import {
  DoorOpen,
  Folder,
  FolderPlus,
  LayoutDashboard,
  LogOut,
  Tag,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="min-h-screen bg-slate-200 px-6 py-16">
      <div className="font-durer text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-200 bg-clip-text text-transparent">
        Portfolio <br />
        Dashboard
      </div>
      <div className="h-0.5 bg-gray-200 w-full rounded-full my-3"></div>
      <div className="flex flex-col justify-between h-full">
        <ul className="text-md flex flex-col gap-3">
          <li>
            <a
              href="/dashboard"
              className="text-slate-800 hover:text-blue-600 flex gap-3 items-center"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/displayPortfolio"
              className="text-slate-800 hover:text-blue-600 flex gap-3 items-center"
            >
              <Folder size={18} />
              Show all
            </a>
          </li>
          <li>
            <a
              href="/createPortfolio"
              className="text-slate-800 hover:text-blue-600 flex gap-3 items-center"
            >
              <FolderPlus size={18} />
              Add new
            </a>
          </li>
          <li>
            <a
              href="/manageSkillTypes"
              className="text-slate-800 hover:text-blue-600 flex gap-3 items-center"
            >
              <Tag size={18} />
              Tags
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-slate-800 hover:text-blue-600 flex gap-3 items-center"
            >
              <DoorOpen size={18} />
              Exit to home
            </a>
          </li>
          <li>
            <a
              href="/logout"
              className="text-slate-800 hover:text-blue-600 flex gap-3 items-center"
            >
              <LogOut size={18} />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
