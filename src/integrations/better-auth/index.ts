import { betterAuth } from "better-auth";
import { serverURL, webClientURL } from "../../utils/environment";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma";

export const betterAuthClient = betterAuth({
  baseURL: serverURL,
  basePath: "/authentications",
  database: prismaAdapter(prismaClient, { provider: "postgresql" }),
  trustedOrigins: [webClientURL],
  user: {
    modelName: "User",
  },
  session: {
    modelName: "Session",
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    }
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },
  emailAndPassword: {
    enabled: true,
  },
});
