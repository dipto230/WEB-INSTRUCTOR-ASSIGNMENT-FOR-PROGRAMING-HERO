
const steps = [
  {
    number: "1",
    title: "Create an Account",
    description:
      "Sign up as a student and access your personalized project dashboard.",
  },
  {
    number: "2",
    title: "Submit Your Project",
    description:
      "Add your project details, repository URL, live link, and description.",
  },
  {
    number: "3",
    title: "Get Mentor Feedback",
    description:
      "Your mentor reviews the project and provides feedback or approval.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Three simple steps
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {step.number}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}