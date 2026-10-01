"use client";

import { useSearchStore } from "@/store/search-store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { IoBagOutline, IoSearch } from "react-icons/io5";
import CartCount from "./CartCount";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const {openSearch} = useSearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Fashion.
        </Link>

     
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium uppercase transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {/* Search */}
            <button onClick={openSearch} className="rounded-full p-2 text-foreground transition-colors hover:bg-surface">
              <IoSearch size={22} />
            </button>

            {/* User */}
            <button onClick={() => router.push("/account")} className="rounded-full p-2 text-foreground transition-colors hover:bg-surface">
              <FaRegUser size={20} />
            </button>

            {/* Shopping Bag */}
            <button onClick={() => router.push("/cart")} className="relative rounded-full p-2 text-foreground transition-colors hover:bg-surface">
              <IoBagOutline size={23} />

              {/* Cart Badge */}
              <CartCount/>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="text-2xl text-foreground md:hidden"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-3 text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <button onClick={() => router.push("/signin")} className="mt-4 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
