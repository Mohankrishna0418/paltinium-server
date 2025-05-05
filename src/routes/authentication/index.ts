import { Hono } from "hono";
import { betterAuthClient } from "../../integrations/better-auth";

export const authenticationsRoutes = new Hono();

authenticationsRoutes.use((c) => {
 return betterAuthClient.handler(c.req.raw);
});