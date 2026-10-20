import prisma from "../../config/prisma";

import {
  GetSubmissionsQuery,
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