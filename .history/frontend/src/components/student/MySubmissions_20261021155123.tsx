```tsx
"use client";

import { ExternalLink, Loader2 } from "lucide-react";

export type Submission = {
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

type MySubmissionsProps = {
  submissions: Submission[];
  loading: boolean;
};

export default function MySubmissions({
  submissions,
  loading,
}: MySubmissionsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border bg-background py-12">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          My Submissions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View your submitted projects and mentor feedback.
        </p>
      </div>

      {submissions.length === 0 ? (
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
              {/* Header */}
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

              {/* Description */}
              <div className="mt-5">
                <p className="text-sm font-medium">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {submission.description}
                </p>
              </div>

              {/* Links */}
              <div className="mt-5 flex flex-wrap gap-3">
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

              {/* Mentor Review */}
              {submission.reviewNote && (
                <div className="mt-5 rounded-lg border bg-muted/40 p-4">
                  <p className="text-sm font-semibold">
                    Mentor Feedback
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {submission.reviewNote}
                  </p>

                  {submission.reviewedBy && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Reviewed by{" "}
                      <span className="font-medium">
                        {submission.reviewedBy.name}
                      </span>
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
  );
}
