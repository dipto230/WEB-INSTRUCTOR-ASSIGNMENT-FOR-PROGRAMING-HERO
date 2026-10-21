
"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-bold leading-none">
              Project Portal
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Submission & Review
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            How It Works
          </a>

          <a
            href="#roles"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Roles
          </a>
        </nav>

        {/* Auth */}

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium hover:bg-muted"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
