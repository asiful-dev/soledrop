"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ListIcon, XIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { logout } from "@/lib/firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui-components/controls/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/ui-components/controls/avatar";
import { Button } from "@/shared/ui-components/controls/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Drops" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { user, loading } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const logoSrc = isDark ? "/dark.png" : "/light.png";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
    document.cookie = "__session=; Max-Age=0; path=/;";
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src={logoSrc}
            alt="SoleDrop"
            width={170}
            height={46}
            priority
            className="object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleThemeToggle}
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>

          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-surface" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-2 ring-border transition-all hover:ring-primary">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL ?? ""} />
                    <AvatarFallback className="bg-primary text-xs text-white">
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 border-border bg-surface text-foreground"
              >
                <DropdownMenuLabel className="text-xs text-muted">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => router.push("/items/add")}
                  className="cursor-pointer hover:bg-primary/10"
                >
                  ➕ Add Product
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/items/manage")}
                  className="cursor-pointer hover:bg-primary/10"
                >
                  ⚙️ Manage Products
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 hover:bg-red-500/10"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-hover"
                asChild
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleThemeToggle}
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Button>

          <button
            className="text-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <ListIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-4 border-t border-border bg-surface px-4 py-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/items/add"
                className="text-sm text-muted hover:text-foreground"
              >
                Add Product
              </Link>
              <Link
                href="/items/manage"
                className="text-sm text-muted hover:text-foreground"
              >
                Manage Products
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-sm text-red-400"
                type="button"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" className="bg-primary" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
