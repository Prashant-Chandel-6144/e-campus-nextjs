import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"; // your prisma client instance
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";
import { role } from "better-auth/plugins";

export const auth = betterAuth({
    baseURL:process.env.BETTER_AUTH_URL!,
    trustedOrigins: [process.env.FRONTEND_URL!],
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google:{
        
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },
  user:{
    additionalFields:{
      role:{
        type: "string",
        required: false,
        defaultValue: "parent",
        input: false
      }
    }
  } 
  
});