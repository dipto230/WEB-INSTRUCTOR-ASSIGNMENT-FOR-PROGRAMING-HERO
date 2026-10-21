/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/hooks/useAuth";
import api from "@/src/lib/api";
import { logout } from "@/src/lib/auth";

import MentorStats from "@/src/components/mentor/MentorStats";
import SubmissionTable from "@/src/components/mentor/SubmissionTable";
import ReviewDialog from "@/src/components/mentor/ReviewDialog";

import {
  Submission,
  SubmissionListResponse,
  SubmissionStatistics,
  SubmissionStatus,
} from "@/src/types/submission";

export default function MentorDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [statistics, setStatistics] =
    useState<SubmissionStatistics>({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    });

  const [submissions, setSubmissions] =
    useState<Submission[]>([]);

  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const [status, setStatus] =
    useState<SubmissionStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [statsLoading, setStatsLoading] = useState(true);

  const [submissionsLoading, setSubmissionsLoading] =
    useState(true);



  const fetchStatistics = useCallback(async () => {
    try {
      setStatsLoading(true);

      const response = await api.get("/reviews/statistics");

      setStatistics(response.data.data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to load statistics.";

      toast.error(message);
    } finally {
      setStatsLoading(false);
    }
  }, []);


  const fetchSubmissions = useCallback(async () => {
    try {
      setSubmissionsLoading(true);

      const params: {
        page: number;
        limit: number;
        status?: SubmissionStatus;
      } = {
        page,
        limit: 10,
      };

      if (status !== "ALL") {
        params.status = status;
      }

      const response = await api.get(
        "/reviews/submissions",
        {
          params,
        }
      );

      const data: SubmissionListResponse =
        response.data.data;

      setSubmissions(data.submissions);
      setPagination(data.pagination);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to load submissions.";

      toast.error(message);
    } finally {
      setSubmissionsLoading(false);
    }
  }, [page, status]);



  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "MENTOR") {
      router.replace("/student/dashboard");
      return;
    }
  }, [user, authLoading, router]);



  useEffect(() => {
    if (
      authLoading ||
      !user ||
      user.role !== "MENTOR"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      void fetchStatistics();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [
    authLoading,
    user,
    fetchStatistics,
  ]);

 

  useEffect(() => {
    if (
      authLoading ||
      !user ||
      user.role !== "MENTOR"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      void fetchSubmissions();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [
    authLoading,
    user,
    fetchSubmissions,
  ]);



  const handleStatusChange = (
    value: SubmissionStatus | "ALL"
  ) => {
    setStatus(value);
    setPage(1);
  };



  const handleReviewSuccess = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchSubmissions(),
    ]);
  };



  const handleLogout = () => {
    logout();
    router.push("/login");
  };



  const handlePreviousPage = () => {
    if (pagination.hasPreviousPage) {
      setPage((current) => current - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPage((current) => current + 1);
    }
  };



  const handleRefresh = async () => {
    await Promise.all([
      fetchStatistics(),
      fetchSubmissions(),
    ]);

    toast.success("Dashboard refreshed.");
  };



  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
    );
  }



  if (!user || user.role !== "MENTOR") {
    return null;
  }



  return (
    <main className="min-h-screen bg-muted/40">
   

      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">
              Project Submission Portal
            </h1>

            <p className="text-sm text-muted-foreground">
              Mentor Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Mentor Info */}

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>

            {/* Logout */}

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

      {/* Main Content */}

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Review Dashboard
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Review and manage student project submissions.
            </p>
          </div>

          {/* Refresh */}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={
              statsLoading ||
              submissionsLoading
            }
            className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                statsLoading ||
                submissionsLoading
                  ? "animate-spin"
                  : ""
              }`}
            />

            Refresh
          </button>
        </div>

        {/* Statistics */}

        <section className="mb-10">
          <MentorStats
            statistics={statistics}
            loading={statsLoading}
          />
        </section>

        {/* Submissions */}

        <section>
          {/* Section Header */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                Submissions
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Review student projects and provide feedback.
              </p>
            </div>

            {/* Status Filter */}

            <div className="flex items-center gap-2">
              <label
                htmlFor="status"
                className="text-sm font-medium"
              >
                Filter:
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  handleStatusChange(
                    event.target.value as
                      | SubmissionStatus
                      | "ALL"
                  )
                }
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
              >
                <option value="ALL">
                  All
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="APPROVED">
                  Approved
                </option>

                <option value="REJECTED">
                  Rejected
                </option>
              </select>
            </div>
          </div>

          {/* Submission Table */}

          <SubmissionTable
            submissions={submissions}
            loading={submissionsLoading}
            onReview={setSelectedSubmission}
          />

          {/* Pagination */}

          {pagination.totalPages > 0 && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing page{" "}
                <span className="font-medium text-foreground">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {pagination.totalPages}
                </span>{" "}
                ({pagination.total} total submissions)
              </p>

              <div className="flex items-center gap-2">
                {/* Previous */}

                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={
                    !pagination.hasPreviousPage ||
                    submissionsLoading
                  }
                  className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </button>

                {/* Next */}

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    !pagination.hasNextPage ||
                    submissionsLoading
                  }
                  className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Review Dialog */}

      <ReviewDialog
        submission={selectedSubmission}
        onClose={() =>
          setSelectedSubmission(null)
        }
        onSuccess={handleReviewSuccess}
      />
    </main>
  );
}
