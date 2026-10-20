
import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { Role } from '../src/generated/prisma/enums';
import { PrismaClient } from '../src/generated/prisma/client';



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const seed = async () => {
  const email = "mentor@example.com";
  const password = "MentorPassword123";

  const passwordHash = await bcrypt.hash(password, 12);

  const mentor = await prisma.user.upsert({
    where: {
      email,
    },

    update: {
      name: "Project Mentor",
      passwordHash,
      role: Role.MENTOR,
    },

    create: {
      name: "Project Mentor",
      email,
      passwordHash,
      role: Role.MENTOR,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  console.log("Mentor seeded successfully:", mentor);
};

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
