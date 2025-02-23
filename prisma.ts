//export const runtime = 'edge'

import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
console.log("Using Prisma client in the following environment:", process.env.NODE_ENV);

export const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma || new PrismaClient({});

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
