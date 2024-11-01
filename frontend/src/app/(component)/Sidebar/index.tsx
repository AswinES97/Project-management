"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LockIcon,
  LucideIcon,
  Home,
  X,
  Briefcase,
  Search,
  Settings,
  Users,
  User,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setIsSidebarCollapsed } from "@/state";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transtion-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* top-logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EDLIST
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* {team} */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              EDROAD TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* navbar links */}
        <nav className="z-10 w-full">
          <SidebarLinks icon={Home} label="Home" href="/" />
          <SidebarLinks icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLinks icon={Search} label="Search" href="/search" />
          <SidebarLinks icon={Settings} label="Settings" href="/settings" />
          <SidebarLinks icon={User} label="Users" href="/users" />
          <SidebarLinks icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* Project Links  */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className=" ">Priority</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* Priority  Links */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className=" ">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
          <SidebarLinks icon={AlertCircle} label="Urgent" href="/priority/urgent" />
          <SidebarLinks icon={ShieldAlert} label="High" href="/priority/high" />
          <SidebarLinks icon={AlertTriangle} label="Medium" href="/priority/medium" />
          <SidebarLinks icon={AlertOctagon} label="Low" href="/priority/low" />
          <SidebarLinks icon={Layers3} label="Backlog" href="/priority/backlog" />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLinks = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`transaction-colors dark:hover:bg-grey-700 relative flex cursor-pointer items-center gap-3 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-800 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : " "
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200"></div>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
