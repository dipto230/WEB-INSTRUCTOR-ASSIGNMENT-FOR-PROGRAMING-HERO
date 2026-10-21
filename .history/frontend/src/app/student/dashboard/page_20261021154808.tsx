```tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, LogOut, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/hooks/useAuth";
import api from "@/src/lib/api";
import { logout } from "@/src/lib/auth";

const submissionSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must not exceed 100 characters"),

  repoUrl: z
    .string()
    .trim()
    .url("Please provide a valid repository URL"),

  liveLink: z
    .string()
    .trim()
    .url("Please provide a valid live link"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

type Submission = {
  id: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  status: string;
  reviewNote: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reviewedBy: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export default function StudentDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [serverError, setServerError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  // Redirect unauthenticated users and users with the wrong role.
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "STUDENT") {
      router.replace("/mentor/dashboard");
    }
  }, [user, loading, router]);

  // Get student's submissions
  const fetchMySubmissions = async () => {
    try {
      setSubmissionsLoading(true);

      const response = await api.get("/submissions/my");

      setSubmissions(response.data.data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to load your submissions.";

      toast.error(message);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  // Load submissions after authentication
  useEffect(() => {
    if (!loading && user?.role === "STUDENT") {
      fetchMySubmissions();
    }
  }, [loading, user]);

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      setServerError("");

      await api.post("/submissions", data);

      toast.success("Project submitted successfully");

      reset();

      // Refresh My Submissions
      await fetchMySubmissions();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to submit project.";

      setServerError(message);
      toast.error(message);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Show loading state while authentication is being checked.
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Prevent dashboard content from rendering before redirect.
  if (!user || user.role !== "STUDENT") {
    return null;
  }

  return (
    <main className="min-h-screen bg-muted/40">
      {/* Navbar */}
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">
              Project Submission Portal
            </h1>

            <p className="text-sm text-muted-foreground">
              Student Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user.name}</p>

              <p className="text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Submit Project */}
        <div className="mb-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              Submit Your Project
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Submit your GitHub repository and live project
              for mentor review.
            </p>
          </div>

          <div className="rounded-xl border bg-background p-6 shadow-sm">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Project Name */}
              <div className="space-y-2">
                <label
                  htmlFor="projectName"
                  className="text-sm font-medium"
                >
                  Project Name
                </label>

                <input
                  id="projectName"
                  type="text"
                  placeholder="E-Waste Management System"
                  {...register("projectName")}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
                />

                {errors.projectName && (
                  <p className="text-sm text-destructive">
                    {errors.projectName.message}
                  </p>
                )}
              </div>

              {/* Repository URL */}
              <div className="space-y-2">
                <label
                  htmlFor="repoUrl"
                  className="text-sm font-medium"
                >
                  GitHub Repository URL
                </label>

                <input
                  id="repoUrl"
                  type="url"
                  placeholder="https://github.com/username/project"
                  {...register("repoUrl")}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
                />

                {errors.repoUrl && (
                  <p className="text-sm text-destructive">
                    {errors.repoUrl.message}
                  </p>
                )}
              </div>

              {/* Live Project Link */}
              <div className="space-y-2">
                <label
                  htmlFor="liveLink"
                  className="text-sm font-medium"
                >
                  Live Project Link
                </label>

                <input
                  id="liveLink"
                  type="url"
                  placeholder="https://my-project.vercel.app"
                  {...register("liveLink")}
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
                />

                {errors.liveLink && (
                  <p className="text-sm text-destructive">
                    {errors.liveLink.message}
                  </p>
                )}
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium"
                >
                  Project Description
                </label>

                <textarea
                  id="description"
                  rows={6}
                  placeholder="Describe your project, its main features, technologies used, and what you implemented..."
                  {...register("description")}
                  className="flex min-h-[140px] w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2"
                />

                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Backend Error */}
              {serverError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {serverError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Project"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* My Submissions */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              My Submissions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              View your submitted projects and mentor feedback.
            </p>
          </div>

          {submissionsLoading ? (
            <div className="flex items-center justify-center rounded-xl border bg-background py-12">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="rounded-xl border bg-background p-10 text-center shadow-sm">
              <p className="font-medium">
                No submissions yet.
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Submit your first project using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="rounded-xl border bg-background p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {submission.projectName}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Submitted on{" "}
                        {new Date(
                          submission.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="w-fit rounded-full border px-3 py-1 text-xs font-medium">
                      {submission.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div>
                      <p className="text-sm font-medium">
                        Description
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {submission.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={submission.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        GitHub Repository
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>

                      <a
                        href={submission.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        Live Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* Mentor Review */}
                  {submission.reviewNote && (
                    <div className="mt-5 rounded-lg border bg-muted/40 p-4">
                      <p className="text-sm font-semibold">
                        Mentor Feedback
                      </p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {submission.reviewNote}
                      </p>

                      {submission.reviewedBy && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          Reviewed by{" "}
                          {submission.reviewedBy.name}
                        </p>
                      )}

                      {submission.reviewedAt && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Reviewed on{" "}
                          {new Date(
                            submission.reviewedAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
```