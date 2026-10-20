import prisma from "../../config/prisma";
import { SubmissionStatus } from "../../generated/prisma/enums";
import AppError from "../../utils/AppError";

import {
    GetSubmissionsQuery,
    ReviewSubmissionInput
} from "./review.validation";

export const getSubmissions = async (
  query: GetSubmissionsQuery,
) => {
  const {
    page = 1,
    limit = 10,
    status,
  } = query;

  const skip = (page - 1) * limit;

  const where = status
    ? {
        status,
      }
    : {};

  const [
    submissions,
    total,
  ] = await Promise.all([
    prisma.submission.findMany({
      where,

      skip,

      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        projectName: true,
        repoUrl: true,
        liveLink: true,
        description: true,
        status: true,
        reviewNote: true,
        reviewedAt: true,
        createdAt: true,

        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        reviewedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),

    prisma.submission.count({
      where,
    }),
  ]);

  const totalPages =
    Math.ceil(total / limit);

  return {
    submissions,

    pagination: {
      page,
      limit,
      total,
      totalPages,

      hasNextPage:
        page < totalPages,

      hasPreviousPage:
        page > 1,
    },
  };
};


export const approveSubmission =
  async (
    submissionId: string,
    mentorId: string,
    data: ReviewSubmissionInput,
  ) => {
    const submission =
      await prisma.submission.findUnique({
        where: {
          id: submissionId,
        },
      });

    if (!submission) {
      throw new AppError(
        "Submission not found",
        404,
      );
    }

    if (
      submission.status !==
      SubmissionStatus.PENDING
    ) {
      throw new AppError(
        `Submission is already ${submission.status.toLowerCase()}`,
        409,
      );
    }

    const updatedSubmission =
      await prisma.submission.update({
        where: {
          id: submissionId,
        },

        data: {
          status:
            SubmissionStatus.APPROVED,

          reviewedById: mentorId,

          reviewedAt: new Date(),

          reviewNote:
            data.reviewNote ?? null,
        },

        select: {
          id: true,
          projectName: true,
          repoUrl: true,
          liveLink: true,
          description: true,
          status: true,
          reviewNote: true,
          reviewedAt: true,
          createdAt: true,

          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          reviewedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    return updatedSubmission;
  };

export const rejectSubmission =
  async (
    submissionId: string,
    mentorId: string,
    data: ReviewSubmissionInput,
  ) => {
    const submission =
      await prisma.submission.findUnique({
        where: {
          id: submissionId,
        },
      });

    if (!submission) {
      throw new AppError(
        "Submission not found",
        404,
      );
    }

    if (
      submission.status !==
      SubmissionStatus.PENDING
    ) {
      throw new AppError(
        `Submission is already ${submission.status.toLowerCase()}`,
        409,
      );
    }

    const reviewNote =
      data.reviewNote?.trim();

    if (!reviewNote) {
      throw new AppError(
        "Review note is required when rejecting a submission",
        400,
      );
    }

    const updatedSubmission =
      await prisma.submission.update({
        where: {
          id: submissionId,
        },

        data: {
          status:
            SubmissionStatus.REJECTED,

          reviewedById: mentorId,

          reviewedAt: new Date(),

          reviewNote,
        },

        select: {
          id: true,
          projectName: true,
          repoUrl: true,
          liveLink: true,
          description: true,
          status: true,
          reviewNote: true,
          reviewedAt: true,
          createdAt: true,

          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          reviewedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    return updatedSubmission;
  };