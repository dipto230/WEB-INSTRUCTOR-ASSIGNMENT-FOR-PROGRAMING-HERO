import { z } from "zod";
import { SubmissionStatus } from "../../generated/prisma/enums";


export const getSubmissionsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform(Number)
    .pipe(
      z
        .number()
        .int()
        .min(1, "Page must be at least 1"),
    ),

  limit: z
    .string()
    .optional()
    .default("10")
    .transform(Number)
    .pipe(
      z
        .number()
        .int()
        .min(1)
        .max(100, "Limit cannot exceed 100"),
    ),

  status: z
    .enum(SubmissionStatus)
    .optional(),
});

export type GetSubmissionsQuery =
  z.infer<typeof getSubmissionsQuerySchema>;