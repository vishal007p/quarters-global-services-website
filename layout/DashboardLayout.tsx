"use client";

import { ReactNode, useState } from "react";
import { Menu, FileText, X, LogOut, Users } from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie"; // ✅ add this

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const topNavItems = [
    { name: "Applications", icon: Users, path: "/dashboard/applications" },
    { name: "Customers", icon: FileText, path: "/dashboard/customers" },
  ];

  const sessionCookieName =
    process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME || "QUATRUS_ADMIN_PANEL_SESSION";

  const handleLogout = () => {
    alert("ss")
    try {
      Cookies.remove(sessionCookieName);

      // Optionally clear localStorage/sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      console.log("Logged out, cookie removed:", sessionCookieName);

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div
        className={clsx(
          "flex flex-col bg-white border-r transition-all duration-300 ease-in-out shadow-md",
          open ? "w-64" : "w-0 lg:w-64"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="font-bold text-red-600 text-lg">Dashboard</h1>
          <button
            title="ss"
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex flex-col justify-between flex-1 overflow-y-auto">
          <nav className="mt-2 px-4">
            {topNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.path);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex items-center w-full px-4 py-2 text-left transition rounded-md",
                    isActive
                      ? "bg-red-100 text-red-600 font-medium"
                      : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Logout Button */}
          <div className="mt-auto mb-4 px-4 border-t pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 h-14 bg-white border-b shadow-sm">
          <button
            title="aa"
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">
            Welcome Back 👋
          </h2>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 font-medium">John Doe</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="user avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        <main className="flex-1 p-6 bg-white overflow-y-auto">
          <div className="w-full h-full overflow-x-auto  ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
