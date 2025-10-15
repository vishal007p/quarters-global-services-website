"use client";

import { ReactNode, useState } from "react";
import { Menu, Home, FileText,   X } from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    { name: "My Profile", icon: Home, path: "/dashboard" },
    { name: "Applications", icon: FileText, path: "/dashboard/applications" },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div
        className={clsx(
          "flex flex-col bg-white border-r transition-all duration-300 ease-in-out",
          // default full width on desktop, toggle on mobile
          open ? "w-64" : "w-0 lg:w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="font-bold text-red-600">Dashboard</h1>
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

         {/* Sidebar Menu */}
        <nav className="flex-1 mt-2 overflow-y-auto px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
                className={clsx(
                  "flex items-center w-full px-4 py-2 text-left transition rounded-sm",
                  isActive
                    ? "bg-red-100 text-red-600 font-normal"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                )}
              >
                <item.icon
                  className={clsx("h-5 w-5", isActive ? "text-red-600" : "")}
                />
                <span className="ml-3">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 h-14 bg-white border-b shadow-sm">
          {/* Toggle button (mobile only) */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">
            Welcome Back 👋
          </h2>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">John Doe</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="user avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
