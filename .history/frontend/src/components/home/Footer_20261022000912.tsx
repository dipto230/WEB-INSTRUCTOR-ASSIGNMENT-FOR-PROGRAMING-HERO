
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">
            Project Submission Portal
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            A simple platform for project submission and
            mentor review.
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-foreground"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="hover:text-foreground"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </footer>
  );
}
