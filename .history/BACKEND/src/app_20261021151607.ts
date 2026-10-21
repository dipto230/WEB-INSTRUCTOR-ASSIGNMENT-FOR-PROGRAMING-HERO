```ts
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import submissionRoutes from "./modules/submission/submission.routes";
import reviewRoutes from "./modules/review/review.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Project Submission API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/submissions", submissionRoutes);

app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

export default app;
