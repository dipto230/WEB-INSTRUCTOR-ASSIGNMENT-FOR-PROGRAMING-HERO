
import {
  Github,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Github,
    title: "Easy Project Submission",
    description:
      "Submit your project name, GitHub repository, live project link, and detailed description from one simple form.",
  },
  {
    icon: ShieldCheck,
    title: "Mentor Review",
    description:
      "Mentors can review submitted projects, approve or reject them, and leave useful feedback for students.",
  },
  {
    icon: LayoutDashboard,
    title: "Track Everything",
    description:
      "Keep track of pending, approved, and rejected submissions through a clean and organized dashboard.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t bg-muted/30 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">
            FEATURES
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Everything you need to manage submissions
          </h2>

          <p className="mt-4 text-muted-foreground">
            Designed to keep the project submission and
            review process simple and organized.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
