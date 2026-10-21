"use client";

import {
  ExternalLink,
  Eye,
  Loader2,
} from "lucide-react";

import { Submission } from "@/src/types/submission";

type SubmissionTableProps = {
  submissions: Submission[];
  loading: boolean;
  onReview: (submission: Submission) => void;
};

const statusStyles = {
  PENDING:
    "border-yellow-300 bg-yellow-50 text-yellow-700",
  APPROVED:
    "border-green-300 bg-green-50 text-green-700",
  REJECTED:
    "border-red-300 bg-red-50 text-red-700",
};

export default function SubmissionTable({
  submissions,
  loading,
  onReview,
}: SubmissionTableProps) {
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border bg-background">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-12 text-center shadow-sm">
        <p className="font-medium">
          No submissions found.
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no submissions matching the selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">
                Project
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Student
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Submitted
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="border-b last:border-b-0 hover:bg-muted/20"
              >
                <td className="px-5 py-4">
                  <div className="max-w-[250px]">
                    <p className="font-medium">
                      {submission.projectName}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {submission.description}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  {submission.student ? (
                    <div>
                      <p className="font-medium">
                        {submission.student.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {submission.student.email}
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      Unknown
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                      statusStyles[submission.status]
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {new Date(
                    submission.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <a
                      href={submission.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs font-medium hover:bg-muted"
                    >
                      GitHub
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>

                    <a
                      href={submission.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs font-medium hover:bg-muted"
                    >
                      Live
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onReview(submission)}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90"
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}