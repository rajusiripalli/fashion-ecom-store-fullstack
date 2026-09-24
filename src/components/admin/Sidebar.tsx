"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import { SidebarContent } from "./SidebarContents";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed  top-0 w-full z-40 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <Link href="/" className="text-xl font-bold">
          Admin Panel
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg border border-border p-2"
        >
          <FiMenu size={22} />
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-border bg-background transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-5 rounded-lg p-2 hover:bg-surface"
        >
          <FiX size={22} />
        </button>

        <SidebarContent
          pathname={pathname}
          closeSidebar={() => setOpen(false)}
        />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-border bg-background lg:flex">
        <SidebarContent
          pathname={pathname}
          closeSidebar={() => setOpen(false)}
        />
      </aside>
    </>
  );
}
