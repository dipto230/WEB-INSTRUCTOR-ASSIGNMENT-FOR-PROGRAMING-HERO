import { z } from "zod";

export const createSubmissionSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(
      2,
      "Project name must be at least 2 characters",
    )
    .max(
      100,
      "Project name must not exceed 100 characters",
    ),

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
    .min(
      20,
      "Description must be at least 20 characters",
    )
    .max(
      2000,
      "Description must not exceed 2000 characters",
    ),
});

export type CreateSubmissionInput =
  z.infer<typeof createSubmissionSchema>;