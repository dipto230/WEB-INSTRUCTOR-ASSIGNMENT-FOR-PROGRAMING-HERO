export type SubmissionStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface Submission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  status: SubmissionStatus;
  reviewNote?: string | null;
  reviewedAt?: string | null;
  createdAt: string;

  student?: {
    id: string;
    name: string;
    email: string;
  };

  reviewedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SubmissionListResponse {
  submissions: Submission[];
  pagination: Pagination;
}

export interface SubmissionStatistics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}