"use client";

import { ReactNode, useState } from "react";
import { Menu, FileText, X, LogOut, Users } from "lucide-react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/logout";
import Image from "next/image";
import Link from "next/link";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const topNavItems = [
    { name: "Applications", icon: Users, path: "/dashboard/applications" },
    { name: "Customers", icon: FileText, path: "/dashboard/customers" },
  ];

  const handleLogoutConfirm = async () => {
    try {
      await logoutAction();
      localStorage.clear();
      sessionStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutDialogOpen(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* ✅ Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md z-[9999]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? Your session will be cleared.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutConfirm}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Layout */}
      <div className="flex h-screen overflow-hidden w-full bg-gray-100">
        {/* Sidebar */}
        <div
          className={clsx(
            "flex flex-col bg-white border-r transition-all duration-300 ease-in-out shadow-md",
            open ? "w-64" : "w-0 lg:w-64"
          )}
        >
          <div className="relative flex items-center justify-center p-4 border-b">
            {/* Logo centered */}
            <Link
              href="/"
              className="font-bold text-red-600 text-lg flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Quartus Logo"
                width={120}
                height={40}
                onClick={() => router.push("/")}
                className="cursor-pointer"
              />
            </Link>

            {/* Close button on the right side */}
            <button
              className="absolute right-4 p-2 text-gray-600 hover:bg-gray-100 rounded lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>


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

            <div className="mt-auto mb-4 px-4 border-t pt-4">
              <Button
                className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-between px-6 h-17 bg-white border-b shadow-sm">
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
              <span className="text-sm text-gray-700 font-medium">John Doe</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="user avatar"
                className="w-9 h-9 rounded-full border"
              />
            </div>
          </header>

          <main className="flex-1 p-6 bg-white overflow-y-hidden">
            <div className="w-full h-full overflow-auto">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
