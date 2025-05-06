import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authenticationsRoutes } from './routes/authentications'
import { cors } from 'hono/cors';
import { webClientURL } from './utils/environment';
const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: webClientURL,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
    maxAge: 600,
  })
);

allRoutes.route("/authentications", authenticationsRoutes)

serve(allRoutes, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})