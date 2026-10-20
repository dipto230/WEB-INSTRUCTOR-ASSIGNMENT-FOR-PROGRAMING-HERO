import { Request } from "express";
import { Role } from "../generated/prisma/enums";


export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}