"use client";

import {
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import api from "@/src/lib/api";
import { Submission } from "@/src/types/submission";

type ReviewDialogProps = {
  submission: Submission | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ReviewDialog({
  submission,
  onClose,
  onSuccess,
}: ReviewDialogProps) {
  const [reviewNote, setReviewNote] = useState("");
  const [loading, setLoading] = useState(false);

  if (!submission) {
    return null;
  }

  const handleReview = async (
    action: "approve" | "reject"
  ) => {
    if (action === "reject" && !reviewNote.trim()) {
      toast.error(
        "Review note is required when rejecting a submission."
      );

      return;
    }

    try {
      setLoading(true);

      const endpoint =
        action === "approve"
          ? `/reviews/submissions/${submission.id}/approve`
          : `/reviews/submissions/${submission.id}/reject`;

      await api.patch(endpoint, {
        reviewNote: reviewNote.trim() || undefined,
      });

      toast.success(
        action === "approve"
          ? "Submission approved successfully."
          : "Submission rejected successfully."
      );

      setReviewNote("");
      onSuccess();
      onClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to review submission.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Review Submission
            </h2>

            <p className="text-sm text-muted-foreground">
              Review the student&apos;s project before approving or rejecting it.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-2 hover:bg-muted disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Project
            </p>

            <p className="mt-1 text-lg font-semibold">
              {submission.projectName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Student
            </p>

            <p className="mt-1 font-medium">
              {submission.student?.name || "Unknown student"}
            </p>

            {submission.student?.email && (
              <p className="text-sm text-muted-foreground">
                {submission.student.email}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">
              Project Description
            </p>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {submission.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={submission.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              GitHub Repository
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>

            <a
              href={submission.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Live Project
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>

          {submission.status !== "PENDING" && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-semibold">
                Review Status
              </p>

              <p className="mt-1 text-sm">
                This submission has already been{" "}
                {submission.status.toLowerCase()}.
              </p>

              {submission.reviewNote && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {submission.reviewNote}
                </p>
              )}
            </div>
          )}

          {submission.status === "PENDING" && (
            <>
              <div>
                <label
                  htmlFor="reviewNote"
                  className="text-sm font-medium"
                >
                  Review Note
                  <span className="ml-1 text-muted-foreground">
                    (required for rejection)
                  </span>
                </label>

                <textarea
                  id="reviewNote"
                  value={reviewNote}
                  onChange={(event) =>
                    setReviewNote(event.target.value)
                  }
                  maxLength={1000}
                  rows={5}
                  placeholder="Write feedback for the student..."
                  disabled={loading}
                  className="mt-2 flex w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <p className="mt-1 text-right text-xs text-muted-foreground">
                  {reviewNote.length}/1000
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleReview("reject")}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-destructive/40 px-4 text-sm font-medium text-destructive hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}

                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => handleReview("approve")}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}

                  Approve
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}