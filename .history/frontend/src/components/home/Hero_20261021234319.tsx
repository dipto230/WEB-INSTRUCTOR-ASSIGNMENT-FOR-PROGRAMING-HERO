
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
  

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
        

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />

            <span className="text-muted-foreground">
              Simple. Organized. Collaborative.
            </span>
          </div>

       

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Submit Your Project.
            <br />

            <span className="text-primary">
              Get Expert Feedback.
            </span>
          </h1>

    

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            A simple platform where students can submit
            their projects and mentors can review them,
            provide feedback, and track submission progress
            in one place.
          </p>

   

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 sm:w-auto"
            >
              Create Your Account

              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-11 w-full items-center justify-center rounded-md border bg-background px-6 text-sm font-medium shadow-sm hover:bg-muted sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>

    

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border bg-background p-2 shadow-2xl">
            <div className="rounded-xl border bg-muted/40 p-6">
             {/* Browser */}

              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />

                <div className="ml-3 h-7 flex-1 rounded-md border bg-background" />
              </div>

              {/* Stats */}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-background p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Total Submissions
                    </p>

                    <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="text-3xl font-bold">
                    24
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Projects submitted
                  </p>
                </div>

                <div className="rounded-xl border bg-background p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Pending Review
                    </p>

                    <MessageSquareText className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="text-3xl font-bold">
                    8
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Waiting for mentor
                  </p>
                </div>

                <div className="rounded-xl border bg-background p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Approved
                    </p>

                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="text-3xl font-bold">
                    16
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Successfully reviewed
                  </p>
                </div>
              </div>

              {/* Recent submissions */}

              <div className="mt-4 rounded-xl border bg-background">
                <div className="border-b px-5 py-4">
                  <p className="font-semibold">
                    Recent Submissions
                  </p>
                </div>

                <div className="divide-y">
                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-medium">
                        E-Waste Management System
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Submitted recently
                      </p>
                    </div>

                    <span className="rounded-full border px-3 py-1 text-xs font-medium">
                      APPROVED
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-medium">
                        Online Learning Platform
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Submitted recently
                      </p>
                    </div>

                    <span className="rounded-full border px-3 py-1 text-xs font-medium">
                      PENDING
                    </span>
                  </div>

                  <div className="hidden items-center justify-between px-5 py-4 sm:flex">
                    <div>
                      <p className="text-sm font-medium">
                        Event Management System
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Submitted recently
                      </p>
                    </div>

                    <span className="rounded-full border px-3 py-1 text-xs font-medium">
                      REJECTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
