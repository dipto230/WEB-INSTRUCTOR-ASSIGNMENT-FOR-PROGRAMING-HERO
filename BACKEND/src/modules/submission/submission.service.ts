import prisma from "../../config/prisma";
import AppError from "../../utils/AppError";
import { CreateSubmissionInput } from "./submission.validation";

export const createSubmission = async (
  studentId: string,
  data: CreateSubmissionInput,
) => {
  const existingSubmission =
    await prisma.submission.findUnique({
      where: {
        studentId_repoUrl: {
          studentId,
          repoUrl: data.repoUrl,
        },
      },
    });

  if (existingSubmission) {
    throw new AppError(
      "You have already submitted this repository",
      409,
    );
  }

  const submission =
    await prisma.submission.create({
      data: {
        projectName: data.projectName,
        repoUrl: data.repoUrl,
        liveLink: data.liveLink,
        description: data.description,
        studentId,
      },

      select: {
        id: true,
        projectName: true,
        repoUrl: true,
        liveLink: true,
        description: true,
        status: true,
        createdAt: true,
      },
    });

  return submission;
};