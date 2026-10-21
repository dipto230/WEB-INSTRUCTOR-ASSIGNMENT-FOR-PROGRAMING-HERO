
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Roles() {
  return (
    <section
      id="roles"
      className="border-t bg-muted/30 py-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">
            BUILT FOR BOTH SIDES
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Students and mentors
          </h2>

          <p className="mt-4 text-muted-foreground">
            Each role gets the tools they need to complete
            the review process efficiently.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Student */}

          <div className="rounded-2xl border bg-background p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
              <Users className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              For Students
            </h3>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm text-muted-foreground">
                  Submit your projects easily
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm text-muted-foreground">
                  Track submission status
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm text-muted-foreground">
                  View mentor feedback
                </span>
              </li>
            </ul>

            <Link
              href="/signup"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Join as Student

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mentor */}

          <div className="rounded-2xl border bg-background p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-muted">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              For Mentors
            </h3>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm text-muted-foreground">
                  View student submissions
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm text-muted-foreground">
                  Filter projects by status
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm text-muted-foreground">
                  Approve, reject, and provide feedback
                </span>
              </li>
            </ul>

            <Link
              href="/login"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium hover:bg-muted"
            >
              Mentor Login

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
