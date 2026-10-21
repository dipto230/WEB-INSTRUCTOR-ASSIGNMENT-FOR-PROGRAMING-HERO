"use client";

import {
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

import { SubmissionStatistics } from "@/src/types/submission";

type MentorStatsProps = {
  statistics: SubmissionStatistics;
  loading: boolean;
};

export default function MentorStats({
  statistics,
  loading,
}: MentorStatsProps) {
  const stats = [
    {
      title: "Total Submissions",
      value: statistics.total,
      icon: FileText,
    },
    {
      title: "Pending",
      value: statistics.pending,
      icon: Clock3,
    },
    {
      title: "Approved",
      value: statistics.approved,
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: statistics.rejected,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-background p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                {loading ? (
                  <div className="mt-2 h-8 w-16 animate-pulse rounded-md bg-muted" />
                ) : (
                  <p className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </p>
                )}
              </div>

              <div className="rounded-lg border p-2">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}