```tsx
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="border-t py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="rounded-2xl border bg-muted/30 p-10 sm:p-14">
          <Sparkles className="mx-auto h-8 w-8" />

          <h2 className="mt-5 text-3xl font-bold tracking-tight">
            Ready to submit your project?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Create your account and start submitting
            projects for mentor review.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
          >
            Get Started

            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```